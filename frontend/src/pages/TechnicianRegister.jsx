import { useEffect, useState } from 'react';
import { registerUser } from '../api/authApi';
import { useNavigate } from "react-router-dom";
import { getCategoriesList } from '../api/categoryApi';

function TechnicianRegister() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [skills, setSkills] = useState([]);
    const [skillOptions, setSkillOptions] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const userData = { name, email, password, phone, address, role: 'technician', skills };
            const response = await registerUser(userData);
            console.log('Technician registration successful:', response);
            navigate('/login');
        }catch(error){
            console.error('Technician registration failed:', error);
        }
    }

    useEffect(() => {
        async function fetchSkills(){
            const fetchedSkillOptions = await getCategoriesList();
            setSkillOptions(fetchedSkillOptions);            
        }
        fetchSkills();
    },[])
    
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Technician Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input type="text" id="name" className="w-full px-3 py-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" id="email" className="w-full px-3 py-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password" id="password" className="w-full px-3 py-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700">Phone</label>
                    <input type="tel" id="phone" className="w-full px-3 py-2 border rounded" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700">Address</label>
                    <input type="text" id="address" className="w-full px-3 py-2 border rounded" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="skills" className="block text-gray-700">Skills</label>
                    <select className="w-full px-3 py-2 border rounded" name="skills" id="skills" onChange={(e) => {
                        if(e.target.value && !skills.includes(e.target.value)){
                            setSkills(prev => [...prev, e.target.value]);
                        }
                    }}>
                        <option value="">Select a skill</option>
                        {skillOptions.map((skill) => (
                            <option key={skill._id} value={skill._id}>{skill.name}</option>
                        ))}
                        <option value="other">Other</option>
                    </select>
                    <div className="">
                        Selected Skills: {
                            skills
                            .map(id => {
                                if(id === 'other') return 'Other';
                                const skill = skillOptions.find(option => option._id === id);
                                return skill ? skill.name : null;
                            })
                            .filter(Boolean)
                            .join(', ')
                        }
                    </div>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Register as Technician</button>
            </form>
        </div>    
    </div>
  )
}

export default TechnicianRegister