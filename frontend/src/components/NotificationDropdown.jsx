import { useEffect, useMemo, useRef, useState } from 'react'
import { Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getNotifications, markAsRead } from '../api/notificationsApi'

function NotificationDropdown() {
	const { user } = useAuth();
	const [notifications, setNotifications] = useState([]);
	const [showNotifications, setShowNotifications] = useState(false);
	const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
	const dropdownRef = useRef(null);
	const navigate = useNavigate();

	const fetchNotifications = async () => {
		if (!user) return;

		setIsLoadingNotifications(true);
		try {
			const fetchedNotifications = await getNotifications();
			setNotifications(Array.isArray(fetchedNotifications) ? fetchedNotifications : []);
		} catch (error) {
			console.error('Error fetching notifications:', error);
			setNotifications([]);
		} finally {
			setIsLoadingNotifications(false);
		}
	}

	useEffect(() => {
		fetchNotifications();
	}, [user]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowNotifications(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const unreadCount = useMemo(
		() => notifications.filter((notification) => !notification.isRead).length,
		[notifications]
	);

	const handleNotificationClick = async (notification) => {
		try {
			if (!notification.isRead) {
				await markAsRead(notification._id);
				setNotifications((prev) =>
					prev.map((item) =>
						item._id === notification._id ? { ...item, isRead: true } : item
					)
				);
			}

			setShowNotifications(false);

			if (notification.job) {
				const jobId = typeof notification.job === 'object' ? notification.job._id : notification.job;
				navigate(`/job/${jobId}`);
			}
		} catch (error) {
			console.error('Error handling notification click:', error);
		}
	};

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				type='button'
				onClick={() => {
					setShowNotifications((prev) => !prev);
					if (!showNotifications) {
						fetchNotifications();
					}
				}}
				className='relative inline-flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 p-2 text-gray-700 transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600'
				aria-label='Notifications'
			>
				<Bell size={18} />
				{unreadCount > 0 && (
					<span className='absolute -right-1 -top-1 min-w-5 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white'>
						{unreadCount}
					</span>
				)}
			</button>

			{showNotifications && (
				<div className='absolute right-0 mt-3 w-88 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl'>
					<div className='border-b border-gray-100 px-4 py-3'>
						<h3 className='text-sm font-semibold text-gray-900'>Notifications</h3>
						<p className='text-xs text-gray-500'>Recent updates and job activity</p>
					</div>

					<div className='max-h-96 overflow-y-auto'>
						{isLoadingNotifications ? (
							<div className='px-4 py-6 text-sm text-gray-500'>Loading notifications...</div>
						) : notifications.length > 0 ? (
							notifications.map((notification) => (
								<button
									key={notification._id}
									type='button'
									onClick={() => handleNotificationClick(notification)}
									className={`flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors duration-200 last:border-b-0 hover:bg-gray-50 ${
										notification.isRead ? 'bg-white' : 'bg-blue-50/60'
									}`}
								>
									<span
										className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
											notification.isRead ? 'bg-gray-300' : 'bg-blue-500'
										}`}
									/>
									<div className='min-w-0 flex-1'>
										<p className='text-sm font-medium text-gray-900'>
											{notification.message}
										</p>
										<p className='mt-1 text-xs text-gray-500'>
											{notification.createdAt
												? new Date(notification.createdAt).toLocaleString()
												: ''}
										</p>
									</div>
								</button>
							))
						) : (
							<div className='px-4 py-8 text-center'>
								<p className='text-sm font-medium text-gray-700'>No notifications yet</p>
								<p className='mt-1 text-xs text-gray-500'>You’ll see updates here when jobs change.</p>
							</div>
						)}
					</div>

					<div className='border-t border-gray-100 bg-gray-50 px-4 py-3'>
						<button
							type='button'
							onClick={() => {
								setShowNotifications(false);
								navigate('/profile');
							}}
							className='text-sm font-medium text-blue-600 hover:text-blue-700'
						>
							View profile
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default NotificationDropdown
