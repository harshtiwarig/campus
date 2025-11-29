import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  BookOpen, 
  Users, 
  Bell, 
  Menu, 
  X, 
  Search, 
  MessageSquare, 
  Clock, 
  MapPin, 
  LogOut, 
  CheckCircle,
  Award,
  Mic,
  FileText,
  CheckSquare,
  XCircle,
  PlusCircle,
  AlertCircle,
  Trophy,
  Gift,
  TrendingUp,
  Zap,
  Shield,
  QrCode,
  Briefcase,
  Hand,
  Tag,
  Monitor,
  Printer,
  Armchair,
  LayoutGrid,
  Megaphone,
  Bot, // Added Bot icon
  Send // Added Send icon
} from 'lucide-react';

// --- MOCK DATA ---

const INITIAL_USERS = {
  student: {
    id: 's1',
    name: 'Aarav Sharma',
    role: 'Student',
    department: 'Computer Science',
    year: '3rd Year',
    avatar: 'AS',
    points: 135,
    badges: ['Event Explorer', 'Community Helper'],
    rank: 12,
    notificationToken: 'token_s1'
  },
  faculty: {
    id: 'f1',
    name: 'Dr. Priya Verma',
    role: 'Faculty',
    department: 'Information Tech',
    avatar: 'PV',
    notificationToken: 'token_f1'
  },
  admin: {
    id: 'a1',
    name: 'Admin Controller',
    role: 'Admin',
    department: 'Management',
    avatar: 'AD',
    notificationToken: 'token_a1'
  }
};

const INITIAL_ANNOUNCEMENTS = [
  "Registration for the Annual Hackathon closes tonight at 11:59 PM!",
  "The Central Library will remain open until 8 PM during exam week.",
  "Guest lecture on AI Ethics in the Main Auditorium tomorrow at 2 PM."
];

const INITIAL_EVENTS = [
  { id: 101, title: 'Data Structures Lecture', time: '10:00 AM - 11:00 AM', type: 'class', location: 'Room 302', date: 'Today', description: 'Regular lecture', createdBy: 'admin', status: 'upcoming' },
  { id: 102, title: 'Hackathon Kickoff', time: '12:00 PM - 01:00 PM', type: 'event', location: 'Auditorium', date: 'Today', description: '24hr hackathon start', createdBy: 'f1', status: 'upcoming' },
];

// --- NEW RESOURCE DATA STRUCTURES ---

const INITIAL_BOOKS = [
  { id: 'b1', title: 'Introduction to Algorithms', author: 'Cormen', qty: 5, image: '📚' },
  { id: 'b2', title: 'Clean Code', author: 'Robert C. Martin', qty: 3, image: '💻' },
  { id: 'b3', title: 'Artificial Intelligence: A Modern Approach', author: 'Russell & Norvig', qty: 4, image: '🤖' },
  { id: 'b4', title: 'Design Patterns', author: 'Erich Gamma', qty: 2, image: '📐' },
  { id: 'b5', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', qty: 5, image: '🛠️' },
  { id: 'b6', title: 'Database System Concepts', author: 'Abraham Silberschatz', qty: 6, image: '🗄️' },
  { id: 'b7', title: 'Computer Networking', author: 'Kurose & Ross', qty: 4, image: '🌐' },
  { id: 'b8', title: 'Operating System Concepts', author: 'Silberschatz', qty: 3, image: '⚙️' },
  { id: 'b9', title: 'Deep Learning', author: 'Ian Goodfellow', qty: 2, image: '🧠' },
  { id: 'b10', title: 'React Up & Running', author: 'Stoyan Stefanov', qty: 5, image: '⚛️' },
  { id: 'b11', title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', qty: 4, image: '📜' },
  { id: 'b12', title: 'Head First Java', author: 'Kathy Sierra', qty: 7, image: '☕' },
  { id: 'b13', title: 'Python Crash Course', author: 'Eric Matthes', qty: 6, image: '🐍' },
  { id: 'b14', title: 'Cracking the Coding Interview', author: 'Gayle Laakmann', qty: 8, image: '💼' },
  { id: 'b15', title: 'You Don\'t Know JS', author: 'Kyle Simpson', qty: 3, image: '❓' },
];

const INITIAL_LAB_EQUIPMENT = [
  { id: 'l1', name: '3D Printer (Prusa i3)', location: 'Fab Lab', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'], bookedSlots: ['10:00'], icon: Printer },
  { id: 'l2', name: 'MacBook Pro M2 (Dev Unit)', location: 'iOS Lab', slots: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00'], bookedSlots: [], icon: Monitor },
  { id: 'l3', name: 'VR Headset (Oculus Quest)', location: 'AR/VR Lab', slots: ['10:00', '11:00', '14:00'], bookedSlots: ['14:00'], icon: Zap },
];

const INITIAL_STUDY_ROOMS = [
  { id: 'sr1', name: 'Quiet Zone A', capacity: 20, bookedSeats: [1, 2, 5, 8, 9] },
  { id: 'sr2', name: 'Group Discussion B', capacity: 12, bookedSeats: [1, 2, 3] },
];

const INITIAL_HALLS = [
  { id: 'ch1', name: 'Main Auditorium', capacity: 500, features: ['Projector', 'Sound System', 'AC'] },
  { id: 'ch2', name: 'Seminar Hall B', capacity: 100, features: ['Projector', 'Whiteboard'] },
];

const INITIAL_POSTS = [
  { id: 1, author: 'Dr. Priya Verma', role: 'Faculty', content: 'Reminder: The internal assessment for DBMS is scheduled for next Monday.', likes: 12, comments: 4, time: '2h ago' },
  { id: 2, author: 'Rohit Singh', role: 'Student', content: 'Looking for 2 teammates for the Smart India Hackathon. MERN stack preferred!', likes: 24, comments: 8, time: '4h ago' },
];

const INITIAL_CONNECT_POSTS = [
  { id: 1, type: 'hiring', title: 'Need Frontend Dev', author: 'Rohan Das', description: 'Looking for a React developer for the upcoming Hackathon.', skills: ['React', 'Tailwind'], contact: 'rohan@svvv.edu.in' },
  { id: 2, type: 'volunteering', title: 'Tech Fest Volunteers', author: 'Event Committee', description: 'Need 5 volunteers for crowd management at the main auditorium.', skills: ['Management', 'Communication'], contact: 'events@svvv.edu.in' }
];

const INITIAL_REQUESTS = [
  { 
    requestId: 'r1', 
    title: 'AI Workshop', 
    description: 'A 2-hour workshop on Generative AI basics.',
    eventType: 'Workshop',
    proposedDate: 'Tomorrow', 
    proposedTime: '02:00 PM - 04:00 PM',
    location: 'Lab 2',
    expectedAttendees: 40,
    budget: '5000',
    requesterId: 's1',
    requesterName: 'Aarav Sharma',
    department: 'Computer Science',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

// New State for Resource Requests
const INITIAL_RESOURCE_REQUESTS = []; 

// --- GAMIFICATION MOCK DATA ---

const BADGES = [
  { id: 'b1', name: 'Event Explorer', icon: '🎫', description: 'Attend 5 events', earned: true },
  { id: 'b2', name: 'Lab Legend', icon: '🔬', description: '10 hours in lab', earned: false, progress: '7/10' },
  { id: 'b3', name: 'Community Helper', icon: '🤝', description: '10 replies in forum', earned: true },
  { id: 'b4', name: 'Power User', icon: '⚡', description: 'Logged in 7 days consecutively', earned: false, progress: '5/7' }
];

const REWARDS = [
  { id: 'rew1', title: '+2 Internal Marks', cost: 100, type: 'academic', description: 'Boost your internal assessment score.' },
  { id: 'rew2', title: 'Tech Fest Pass', cost: 120, type: 'event', description: 'Free entry to the annual Tech Fest.' },
  { id: 'rew3', title: 'Lab Priority Slot', cost: 80, type: 'resource', description: 'Book labs without waiting.' },
  { id: 'rew4', title: 'Hostel WiFi Boost', cost: 50, type: 'utility', description: 'High-speed data for 24 hours.' }
];

const LEADERBOARD = [
  { rank: 1, name: 'Riya Sharma', points: 560, avatar: 'RS', dept: 'CSE' },
  { rank: 2, name: 'Arjun Patel', points: 535, avatar: 'AP', dept: 'IT' },
  { rank: 3, name: 'Neha Gupta', points: 490, avatar: 'NG', dept: 'CSE' },
  { rank: 12, name: 'You', points: 135, avatar: 'AS', dept: 'CSE', isUser: true },
];

const INITIAL_REDEMPTIONS = [
  { id: 'red1', item: 'Hostel WiFi Boost', cost: 50, status: 'approved', date: '2 days ago', studentName: 'Aarav Sharma' },
  { id: 'red2', item: '+2 Internal Marks', cost: 100, status: 'pending', date: 'Just now', studentName: 'Aarav Sharma' }
];

// --- COMPONENTS ---

const LoginScreen = ({ onLogin }) => (
  <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900 transition-colors font-sans">
    {/* Left Side - Hero & Branding */}
    <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 relative overflow-hidden flex-col justify-between p-12 text-white">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500 opacity-30 blur-3xl"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
           <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
             <BookOpen className="w-8 h-8 text-white" />
           </div>
           <span className="text-2xl font-bold tracking-tight">CampusConnect</span>
        </div>
        <h1 className="text-5xl font-extrabold leading-tight mb-6">Your Campus Life, <br/><span className="text-indigo-200">Reimagined.</span></h1>
        <p className="text-lg text-indigo-100 max-w-md leading-relaxed">One platform to manage classes, events, resources, and community. Connect with peers, book labs, and stay updated in real-time.</p>
      </div>
      <div className="relative z-10 text-sm text-indigo-200 font-medium">© 2024 Shri Vaishnav Vidyapeeth Vishwavidyalaya</div>
    </div>
    {/* Right Side - Login/Role Selection */}
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Select your portal to continue.</p>
        </div>
        <div className="space-y-4 mt-8">
          {[
            { id: 'student', label: 'Student Portal', icon: Users, desc: 'Manage schedule, events & grades', color: 'indigo' },
            { id: 'faculty', label: 'Faculty Portal', icon: FileText, desc: 'Approve requests & class management', color: 'emerald' },
            { id: 'admin', label: 'Admin Portal', icon: CheckCircle, desc: 'System oversight & resource control', color: 'orange' }
          ].map((role) => (
             <button key={role.id} onClick={() => onLogin(role.id)} className="group w-full flex items-center p-4 bg-white dark:bg-slate-800 border-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-400 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 text-left">
               <div className={`p-3 rounded-xl mr-4 transition-colors ${role.id === 'student' ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white' : role.id === 'faculty' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' : 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white'}`}>
                 <role.icon className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{role.label}</h3>
                 <p className="text-sm text-gray-500 dark:text-gray-400">{role.desc}</p>
               </div>
             </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Notification = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-bounce-in z-50 max-w-sm">
    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
    <span>{message}</span>
    <button onClick={onClose} className="ml-4 text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
  </div>
);

const AnnouncementBanner = ({ messages }) => (
  <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50 border-y border-orange-200 dark:border-orange-800 py-3 overflow-hidden relative flex items-center shadow-inner">
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
      }
      .animate-marquee {
        animation: marquee 30s linear infinite;
      }
      .animate-marquee:hover {
        animation-play-state: paused;
      }
    `}</style>
    
    <div className="bg-orange-500 text-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest absolute left-0 z-10 flex items-center shadow-lg rounded-r-lg animate-pulse ml-0">
       <Megaphone className="w-3 h-3 mr-2" /> Announcements
    </div>
    
    <div className="flex w-full overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-sm font-semibold text-orange-800 dark:text-orange-200 pl-32 items-center">
          {messages.map((msg, i) => (
             <span key={i} className="flex items-center">
               <span className="w-2 h-2 rounded-full bg-orange-500 mr-3"></span>
               {msg}
             </span>
          ))}
          {messages.map((msg, i) => (
             <span key={`dup-${i}`} className="flex items-center">
               <span className="w-2 h-2 rounded-full bg-orange-500 mr-3"></span>
               {msg}
             </span>
          ))}
        </div>
    </div>
  </div>
);

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your Campus AI Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let responseText = "I'm a demo bot. I can help you navigate the portal or answer basic questions.";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('event') || lowerInput.includes('hackathon')) {
        responseText = "You can view upcoming events in the 'Dashboard' or submit new event requests in the 'My Requests' tab.";
      } else if (lowerInput.includes('book') || lowerInput.includes('library')) {
        responseText = "Head over to the 'Resource Booking' tab to check book availability and reserve items.";
      } else if (lowerInput.includes('point') || lowerInput.includes('reward')) {
        responseText = "You earn points by attending events and helping others! Check your progress in the 'Campus Rewards' section.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: responseText, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 w-80 h-96 mb-4 flex flex-col animate-fade-in overflow-hidden">
          <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-bold">Campus Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-700 p-1 rounded-full"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-slate-900">
             {messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white dark:bg-slate-700 dark:text-gray-200 text-gray-800 border border-gray-100 dark:border-slate-600 rounded-bl-none shadow-sm'}`}>
                   {msg.text}
                 </div>
               </div>
             ))}
             <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 flex gap-2">
             <input 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Type a message..." 
               className="flex-1 text-sm bg-gray-50 dark:bg-slate-900 border-none rounded-full px-4 focus:ring-2 focus:ring-indigo-500 dark:text-white"
             />
             <button type="submit" className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-sm transition-transform active:scale-95">
               <Send className="w-4 h-4" />
             </button>
          </form>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 flex items-center justify-center group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6 group-hover:animate-bounce" />}
      </button>
    </div>
  );
};

export default function App() {
  const [allUsers, setAllUsers] = useState(INITIAL_USERS);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  
  // Resource States
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [equipment, setEquipment] = useState(INITIAL_LAB_EQUIPMENT);
  const [rooms, setRooms] = useState(INITIAL_STUDY_ROOMS);
  const [halls, setHalls] = useState(INITIAL_HALLS);
  const [resourceRequests, setResourceRequests] = useState(INITIAL_RESOURCE_REQUESTS);

  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [connectPosts, setConnectPosts] = useState(INITIAL_CONNECT_POSTS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS); // New State
  const [viewMode, setViewMode] = useState('list');
  const [redemptions, setRedemptions] = useState(INITIAL_REDEMPTIONS);
  const [showQR, setShowQR] = useState(false);
  const [prefilledLocation, setPrefilledLocation] = useState('');

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // --- ACTIONS ---

  const handleLogin = (role) => {
    setUser(allUsers[role]);
  };

  const handleRequestSubmit = (formData) => {
    const newRequest = {
      requestId: `r${Date.now()}`,
      ...formData,
      requesterId: user.id,
      requesterName: user.name,
      department: user.department,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setRequests([newRequest, ...requests]);
    setViewMode('list');
    showNotification("Event request submitted! Pending faculty approval.");
  };

  const handleDirectCreate = (formData) => {
    const newEvent = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      time: formData.proposedTime,
      date: formData.proposedDate,
      location: formData.location,
      type: formData.eventType,
      createdBy: user.id,
      createdByRole: 'faculty',
      status: 'upcoming',
      department: user.department
    };
    setEvents([...events, newEvent]);
    setViewMode('list');
    setPrefilledLocation(''); // Reset
    showNotification("Event created and published immediately!");
  };

  const handleApproveRequest = (req) => {
    const updatedRequests = requests.map(r => r.requestId === req.requestId ? { ...r, status: 'approved', reviewedAt: new Date().toISOString(), approvedBy: user.id } : r);
    setRequests(updatedRequests);
    
    const newEvent = {
      id: Date.now(),
      requestId: req.requestId,
      title: req.title,
      description: req.description,
      time: req.proposedTime,
      date: req.proposedDate,
      location: req.location,
      type: req.eventType,
      createdBy: req.requesterId,
      createdByRole: 'student',
      approvedBy: user.id,
      status: 'upcoming',
      department: req.department
    };
    setEvents([...events, newEvent]);

    if (req.requesterId === 's1') { 
      const updatedStudent = { ...allUsers.student, points: allUsers.student.points + 10 };
      setAllUsers({ ...allUsers, student: updatedStudent });
      showNotification(`Request approved! Student awarded +10 Campus Points.`);
    } else {
      showNotification(`Request "${req.title}" approved & published!`);
    }
  };

  const handleRejectRequest = (reqId, reason) => {
    const updatedRequests = requests.map(r => r.requestId === reqId ? { ...r, status: 'rejected', rejectionReason: reason, reviewedAt: new Date().toISOString(), approvedBy: user.id } : r);
    setRequests(updatedRequests);
    showNotification("Request rejected.");
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const text = e.target.elements.postContent.value;
    if (!text) return;
    const newPost = { id: Date.now(), author: user.name, role: user.role, content: text, likes: 0, comments: 0, time: 'Just now' };
    setPosts([newPost, ...posts]);
    e.target.reset();
    showNotification('Post shared with campus!');
  };

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    const text = e.target.elements.announcementText.value;
    if (!text) return;
    setAnnouncements([text, ...announcements]);
    e.target.reset();
    showNotification("Announcement broadcasted successfully!");
  }

  const handleConnectPostSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPost = {
      id: Date.now(),
      type: formData.get('type'),
      title: formData.get('title'),
      author: user.name,
      description: formData.get('description'),
      skills: formData.get('skills').split(',').map(s => s.trim()),
      contact: formData.get('contact')
    };
    setConnectPosts([newPost, ...connectPosts]);
    e.target.reset();
    setViewMode('list');
    showNotification("Opportunity posted to Connect Hub!");
  };

  const handleRedeem = (reward) => {
    if (user.points < reward.cost) {
      showNotification("Not enough points!");
      return;
    }
    const newPoints = user.points - reward.cost;
    setUser({ ...user, points: newPoints });
    
    const updatedStudent = { ...allUsers.student, points: newPoints };
    setAllUsers({ ...allUsers, student: updatedStudent });

    const newRedemption = {
      id: `red${Date.now()}`,
      item: reward.title,
      cost: reward.cost,
      status: 'pending',
      date: 'Just now',
      studentName: user.name
    };
    setRedemptions([newRedemption, ...redemptions]);
    showNotification(`Redeemed ${reward.title}! Pending approval.`);
  };

  const handleApproveRedemption = (redemptionId) => {
    const updated = redemptions.map(r => r.id === redemptionId ? { ...r, status: 'approved' } : r);
    setRedemptions(updated);
    showNotification("Redemption request approved.");
  };

  // --- NEW RESOURCE ACTIONS ---

  const handleResourceRequest = (type, details) => {
    const newReq = {
      id: `res_req_${Date.now()}`,
      type, // 'book', 'equipment', 'seat', 'hall'
      ...details,
      requesterName: user.name,
      status: 'pending',
      timestamp: new Date().toLocaleTimeString()
    };
    setResourceRequests([newReq, ...resourceRequests]);
    showNotification(`${type} request sent to faculty!`);
  };

  const handleApproveResource = (req) => {
    // 1. Update Request Status
    const updatedReqs = resourceRequests.map(r => r.id === req.id ? { ...r, status: 'approved' } : r);
    setResourceRequests(updatedReqs);

    // 2. Perform Resource-Specific Update
    if (req.type === 'Book') {
      const updatedBooks = books.map(b => b.id === req.itemId ? { ...b, qty: b.qty - 1 } : b);
      setBooks(updatedBooks);
    } else if (req.type === 'Equipment') {
      const updatedEquip = equipment.map(e => e.id === req.itemId ? { ...e, bookedSlots: [...e.bookedSlots, req.slot] } : e);
      setEquipment(updatedEquip);
    } else if (req.type === 'Seat') {
      const updatedRooms = rooms.map(r => r.id === req.roomId ? { ...r, bookedSeats: [...r.bookedSeats, req.seatNum] } : r);
      setRooms(updatedRooms);
    }
    
    showNotification(`${req.type} request approved successfully.`);
  };

  const handleRejectResource = (reqId) => {
    const updatedReqs = resourceRequests.map(r => r.id === reqId ? { ...r, status: 'rejected' } : r);
    setResourceRequests(updatedReqs);
    showNotification("Resource request rejected.");
  };

  if (!user) return <LoginScreen onLogin={handleLogin} />;

  // --- SUB-COMPONENTS ---

  const QRModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowQR(false)}>
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4 dark:text-white">{user.name}</h3>
        <div className="bg-white p-4 rounded-xl inline-block mb-4 border-2 border-indigo-100">
           <QrCode className="w-48 h-48 text-gray-900" />
        </div>
        <p className="text-gray-500 text-sm">Scan at events to earn points automatically!</p>
        <button onClick={() => setShowQR(false)} className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg w-full">Close</button>
      </div>
    </div>
  );

  const EventForm = ({ onSubmit, mode = 'request', onCancel, initialLocation = '' }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-slate-700 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{mode === 'direct' ? 'Create New Event' : 'Submit Event Request'}</h3>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700"><X className="w-5 h-5"/></button>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = {
          title: e.target.title.value,
          eventType: e.target.eventType.value,
          proposedDate: e.target.date.value,
          proposedTime: e.target.time.value,
          location: e.target.location.value,
          expectedAttendees: e.target.attendees.value,
          budget: e.target.budget.value,
          description: e.target.description.value,
          coOrganizers: e.target.coOrganizers?.value || '',
          requirements: e.target.requirements?.value || ''
        };
        onSubmit(formData);
      }} className="space-y-4">
        {/* Same fields as before */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required name="title" className="w-full rounded-lg border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white p-2.5 border" placeholder="Event Title" />
          <select name="eventType" className="w-full rounded-lg border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white p-2.5 border"><option>Academic</option><option>Social</option><option>Hackathon</option></select>
          <input required name="date" className="w-full rounded-lg border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white p-2.5 border" placeholder="Date" />
          <input required name="time" className="w-full rounded-lg border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white p-2.5 border" placeholder="Time" />
          <input required name="location" defaultValue={initialLocation} className="w-full rounded-lg border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white p-2.5 border" placeholder="Location" />
          <input name="attendees" className="w-full rounded-lg border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white p-2.5 border" placeholder="Est. count" />
          <input name="budget" className="w-full rounded-lg border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white p-2.5 border" placeholder="Budget INR" />
          <input name="coOrganizers" className="w-full rounded-lg border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white p-2.5 border" placeholder="Co-Organizers" />
        </div>
        <textarea required name="description" rows="3" className="w-full rounded-lg border-gray-300 dark:bg-slate-700 dark:border-slate-600 dark:text-white p-2.5 border" placeholder="Description..."></textarea>
        <div className="pt-2 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-slate-700">Cancel</button>
          <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition-colors">Submit</button>
        </div>
      </form>
    </div>
  );

  const ResourcesView = () => {
    const [resCategory, setResCategory] = useState('library');
    const [selectedRoom, setSelectedRoom] = useState(null);

    // Helper for Hall Proposal
    const handleHallProposal = (e, hallName) => {
      e.preventDefault();
      const reason = e.target.reason.value;
      const date = e.target.date.value;
      handleResourceRequest('Hall', { itemName: hallName, reason, date });
      e.target.reset();
    };

    return (
      <div className="animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Resource Booking</h2>
          <div className="flex gap-2 bg-gray-100 dark:bg-slate-700 p-1 rounded-lg overflow-x-auto">
             {['library', 'lab', 'rooms', 'hall'].map(cat => (
               <button 
                 key={cat}
                 onClick={() => setResCategory(cat)} 
                 className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${resCategory === cat ? 'bg-white dark:bg-slate-600 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {/* LIBRARY VIEW */}
        {resCategory === 'library' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
              <div key={book.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5 flex flex-col">
                 <div className="text-4xl mb-4">{book.image}</div>
                 <h3 className="font-bold text-gray-800 dark:text-white line-clamp-1">{book.title}</h3>
                 <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                 <div className="mt-auto flex justify-between items-center">
                   <span className={`text-xs font-bold px-2 py-1 rounded-full ${book.qty > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                     {book.qty > 0 ? `${book.qty} Available` : 'Out of Stock'}
                   </span>
                   <button 
                     onClick={() => handleResourceRequest('Book', { itemName: book.title, itemId: book.id })}
                     disabled={book.qty === 0}
                     className={`px-4 py-2 rounded-lg text-sm font-medium ${book.qty > 0 ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                   >
                     Request
                   </button>
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* LAB VIEW */}
        {resCategory === 'lab' && (
          <div className="space-y-6">
            {equipment.map(item => (
              <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center"><MapPin className="w-3 h-3 mr-1"/> {item.location}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {item.slots.map(slot => {
                    const isBooked = item.bookedSlots.includes(slot);
                    return (
                      <button 
                        key={slot}
                        disabled={isBooked}
                        onClick={() => handleResourceRequest('Equipment', { itemName: item.name, itemId: item.id, slot })}
                        className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                          isBooked 
                            ? 'bg-red-50 border-red-100 text-red-400 cursor-not-allowed' 
                            : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 hover:border-indigo-500 hover:text-indigo-600'
                        }`}
                      >
                        {slot} {isBooked ? '(Busy)' : ''}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STUDY ROOMS VIEW */}
        {resCategory === 'rooms' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map(room => (
              <div key={room.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-gray-800 dark:text-white">{room.name}</h3>
                   <span className="text-xs bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-full">{room.bookedSeats.length}/{room.capacity} Occupied</span>
                 </div>
                 <div className="grid grid-cols-5 gap-3">
                   {Array.from({ length: room.capacity }).map((_, idx) => {
                     const seatNum = idx + 1;
                     const isBooked = room.bookedSeats.includes(seatNum);
                     return (
                       <button
                         key={seatNum}
                         disabled={isBooked}
                         onClick={() => handleResourceRequest('Seat', { itemName: room.name, roomId: room.id, seatNum })}
                         className={`h-10 rounded-md flex items-center justify-center text-xs font-bold transition-colors ${
                           isBooked 
                            ? 'bg-red-500 text-white cursor-not-allowed' 
                            : 'bg-green-100 text-green-700 hover:bg-green-500 hover:text-white'
                         }`}
                         title={isBooked ? 'Occupied' : 'Reserve Seat'}
                       >
                         {seatNum}
                       </button>
                     )
                   })}
                 </div>
                 <div className="mt-4 flex gap-4 text-xs text-gray-500 justify-center">
                   <span className="flex items-center"><div className="w-3 h-3 bg-green-100 rounded mr-1"></div> Available</span>
                   <span className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded mr-1"></div> Occupied</span>
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* CONFERENCE HALL VIEW */}
        {resCategory === 'hall' && (
           <div className="space-y-6">
             {halls.map(hall => (
               <div key={hall.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row">
                  <div className="bg-gray-100 dark:bg-slate-700 w-full md:w-1/3 flex items-center justify-center p-8">
                     <Monitor className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="p-6 flex-1">
                     <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{hall.name}</h3>
                     <div className="flex flex-wrap gap-2 mb-4">
                       <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md">Capacity: {hall.capacity}</span>
                       {hall.features.map(f => <span key={f} className="text-xs bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md">{f}</span>)}
                     </div>
                     <form onSubmit={(e) => handleHallProposal(e, hall.name)} className="mt-4 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700">
                        <h4 className="font-bold text-sm mb-3 dark:text-gray-200">Propose Event</h4>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                           <input name="date" required className="text-sm p-2 rounded border dark:bg-slate-800 dark:border-slate-600" placeholder="Date/Time" />
                           <input name="reason" required className="text-sm p-2 rounded border dark:bg-slate-800 dark:border-slate-600" placeholder="Purpose of Booking" />
                        </div>
                        <button className="w-full py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800">Submit Proposal to Faculty</button>
                     </form>
                  </div>
               </div>
             ))}
           </div>
        )}
      </div>
    );
  };

  const ConnectHubView = () => (
    <div className="space-y-6 animate-fade-in">
       {/* Same Connect Hub Code */}
       <div className="flex justify-between items-center">
         <div>
           <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
             <MessageSquare className="w-6 h-6 text-indigo-500" /> Connect Hub
           </h2>
           <p className="text-gray-500 text-sm mt-1">Find teammates, hire talent, or volunteer.</p>
         </div>
         {viewMode === 'list' && (
           <button onClick={() => setViewMode('create')} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
             <PlusCircle className="w-4 h-4" /> Post Opportunity
           </button>
         )}
       </div>

       {viewMode === 'create' ? (
         <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Create New Post</h3>
            <form onSubmit={handleConnectPostSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium mb-1 dark:text-gray-300">Category</label>
                   <select name="type" className="w-full p-2.5 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                     <option value="hiring">Hiring / Teammates</option>
                     <option value="volunteering">Volunteering</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-medium mb-1 dark:text-gray-300">Title</label>
                   <input required name="title" className="w-full p-2.5 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="e.g. Need Designer for Hackathon" />
                </div>
              </div>
              <div>
                 <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
                 <textarea required name="description" rows="3" className="w-full p-2.5 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="Role details, event date, etc."></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium mb-1 dark:text-gray-300">Skills / Tags (comma separated)</label>
                   <input required name="skills" className="w-full p-2.5 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="React, Figma, Speaking" />
                </div>
                <div>
                   <label className="block text-sm font-medium mb-1 dark:text-gray-300">Contact Info</label>
                   <input required name="contact" className="w-full p-2.5 rounded-lg border dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="Email or Phone" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setViewMode('list')} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-slate-700">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Post</button>
              </div>
            </form>
         </div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {connectPosts.map(post => (
             <div key={post.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow">
               <div className="flex justify-between items-start mb-2">
                 <div className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${post.type === 'hiring' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                   {post.type}
                 </div>
                 <span className="text-xs text-gray-400">Just now</span>
               </div>
               <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">{post.title}</h3>
               <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{post.description}</p>
               
               <div className="flex flex-wrap gap-2 mb-4">
                 {post.skills.map((skill, idx) => (
                   <span key={idx} className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs flex items-center">
                     <Tag className="w-3 h-3 mr-1" /> {skill}
                   </span>
                 ))}
               </div>
               
               <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700">
                 <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                     {post.author.charAt(0)}
                   </div>
                   <span className="text-xs text-gray-500">{post.author}</span>
                 </div>
                 <button className="text-sm font-medium text-indigo-600 hover:underline">Contact</button>
               </div>
             </div>
           ))}
         </div>
       )}
    </div>
  );

  const FacultyApprovalView = () => {
    const [activeTab, setActiveTab] = useState('events'); // events, redemptions, resources
    const [filter, setFilter] = useState('pending');
    
    const filteredRequests = requests.filter(r => filter === 'all' ? true : r.status === filter);
    const filteredRedemptions = redemptions.filter(r => filter === 'all' ? true : r.status === filter);
    const filteredResources = resourceRequests.filter(r => filter === 'all' ? true : r.status === filter);

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Approvals</h2>
          <div className="flex gap-2 bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
             {['events', 'redemptions', 'resources'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)} 
                 className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-white dark:bg-slate-600 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500'}`}
               >
                 {tab}
               </button>
             ))}
          </div>
        </div>

        {activeTab === 'events' && (
           <div className="space-y-4">
              {filteredRequests.map(req => (
                 <div key={req.requestId} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white">{req.title}</h4>
                      <p className="text-sm text-gray-500">{req.requesterName} • {req.eventType}</p>
                      <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{req.status}</span>
                    </div>
                    {req.status === 'pending' && (
                       <div className="flex gap-2 items-center">
                         <button onClick={() => handleApproveRequest(req)} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200"><CheckSquare className="w-5 h-5"/></button>
                         <button onClick={() => handleRejectRequest(req.requestId, "Policy")} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><XCircle className="w-5 h-5"/></button>
                       </div>
                    )}
                 </div>
              ))}
           </div>
        )}

        {activeTab === 'redemptions' && (
           <div className="space-y-4">
              {filteredRedemptions.length === 0 ? <p className="text-gray-500">No redemption requests.</p> : filteredRedemptions.map(red => (
                 <div key={red.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex justify-between items-center">
                    <div>
                       <h4 className="font-bold text-gray-800 dark:text-white">{red.item}</h4>
                       <p className="text-sm text-gray-500">Student: {red.studentName}</p>
                       <p className="text-xs text-indigo-500 font-medium mt-1">Cost: {red.cost} Points</p>
                    </div>
                    {red.status === 'pending' ? (
                       <button onClick={() => handleApproveRedemption(red.id)} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700">Approve</button>
                    ) : (
                       <span className="text-sm text-green-600 font-bold flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> Approved</span>
                    )}
                 </div>
              ))}
           </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-4">
            {filteredResources.length === 0 ? <p className="text-gray-500">No resource requests.</p> : filteredResources.map(resReq => (
              <div key={resReq.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex justify-between items-start">
                 <div>
                   <h4 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                     {resReq.type === 'Book' && '📚 Book Request'}
                     {resReq.type === 'Equipment' && '💻 Equipment Request'}
                     {resReq.type === 'Seat' && '🪑 Seat Reservation'}
                     {resReq.type === 'Hall' && '🎤 Hall Proposal'}
                   </h4>
                   <p className="font-medium text-sm mt-1">{resReq.itemName}</p>
                   <div className="text-xs text-gray-500 mt-1 space-y-1">
                     <p>Requester: {resReq.requesterName}</p>
                     {resReq.slot && <p>Slot: {resReq.slot}</p>}
                     {resReq.seatNum && <p>Seat #{resReq.seatNum}</p>}
                     {resReq.reason && <p className="italic">"{resReq.reason}"</p>}
                   </div>
                 </div>
                 {resReq.status === 'pending' ? (
                   <div className="flex gap-2">
                     <button onClick={() => handleApproveResource(resReq)} className="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700">Accept</button>
                     <button onClick={() => handleRejectResource(resReq.id)} className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">Reject</button>
                   </div>
                 ) : (
                   <span className={`text-xs font-bold uppercase ${resReq.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                     {resReq.status}
                   </span>
                 )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const GamificationView = () => (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Header & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-medium opacity-90">Campus Points</h3>
            <div className="text-4xl font-bold mt-2 flex items-baseline gap-2">
              {user.points} <span className="text-sm font-normal opacity-75">pts</span>
            </div>
            <button onClick={() => setShowQR(true)} className="mt-4 flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-sm transition-colors backdrop-blur-sm">
              <QrCode className="w-4 h-4" /> Show ID to Earn
            </button>
          </div>
          <Trophy className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-white opacity-20 rotate-12" />
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col justify-between">
           <div>
             <h3 className="text-gray-500 text-sm font-medium">Current Rank</h3>
             <div className="text-3xl font-bold text-gray-800 dark:text-white mt-1">#{user.rank} <span className="text-sm text-gray-400 font-normal">in {user.department}</span></div>
           </div>
           <div className="mt-4">
             <div className="text-xs text-gray-500 flex justify-between mb-1">
               <span>Next Badge: Lab Legend</span>
               <span>70%</span>
             </div>
             <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
               <div className="bg-indigo-500 h-full w-[70%]"></div>
             </div>
           </div>
        </div>

        {/* AI Suggestion Box */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-center relative overflow-hidden">
           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2 text-indigo-200 text-sm font-bold uppercase tracking-wider">
               <Zap className="w-4 h-4" /> AI Suggestion
             </div>
             <p className="font-medium leading-relaxed">
               "Hey {user.name.split(' ')[0]}! You are 15 points away from the 'Lab Legend' badge. Book a slot in <span className="underline decoration-indigo-300 underline-offset-2">Physics Lab</span> today to level up!"
             </p>
           </div>
           <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Rewards Store */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Gift className="w-5 h-5 text-pink-500" /> Rewards Store
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REWARDS.map(reward => (
              <div key={reward.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow relative group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">{reward.title}</h4>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${
                      reward.type === 'academic' ? 'bg-blue-100 text-blue-700' : 
                      reward.type === 'event' ? 'bg-purple-100 text-purple-700' : 
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {reward.type}
                    </span>
                  </div>
                  <div className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-full text-sm">
                    {reward.cost} pts
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4 h-10">{reward.description}</p>
                <button 
                  onClick={() => handleRedeem(reward)}
                  disabled={user.points < reward.cost}
                  className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                    user.points >= reward.cost 
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {user.points >= reward.cost ? 'Redeem Now' : 'Need more points'}
                </button>
              </div>
            ))}
          </div>

          {/* Badges Gallery */}
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mt-8">
            <Shield className="w-5 h-5 text-indigo-500" /> Your Badges
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {BADGES.map(badge => (
               <div key={badge.id} className={`p-4 rounded-xl border text-center ${badge.earned ? 'bg-indigo-50 border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800' : 'bg-gray-50 border-gray-100 dark:bg-slate-800 dark:border-slate-700 opacity-60 grayscale'}`}>
                 <div className="text-4xl mb-2">{badge.icon}</div>
                 <div className="font-bold text-sm text-gray-800 dark:text-gray-200">{badge.name}</div>
                 <div className="text-xs text-gray-500 mt-1">{badge.description}</div>
               </div>
             ))}
          </div>
        </div>

        {/* 3. Leaderboard & History */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-500" /> Leaderboard
            </h3>
            <div className="space-y-3">
              {LEADERBOARD.map((entry, idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${entry.isUser ? 'bg-indigo-50 border border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800' : 'hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 flex items-center justify-center font-bold text-sm rounded-full ${idx < 3 ? 'bg-yellow-100 text-yellow-700' : 'text-gray-400'}`}>
                      {entry.rank}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                      {entry.avatar}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${entry.isUser ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-800 dark:text-gray-200'}`}>
                        {entry.name} {entry.isUser && '(You)'}
                      </p>
                      <p className="text-[10px] text-gray-500">{entry.dept}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-700 dark:text-gray-300 text-sm">{entry.points}</span>
                </div>
              ))}
            </div>
            <button className="w-full text-center text-xs text-indigo-600 font-medium mt-4 hover:underline">View Full Leaderboard</button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
             <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-gray-400" /> Redemption History
            </h3>
            <div className="space-y-4">
               {redemptions.map(red => (
                 <div key={red.id} className="flex justify-between items-center text-sm">
                   <div>
                     <p className="font-medium text-gray-800 dark:text-gray-200">{red.item}</p>
                     <p className="text-xs text-gray-400">{red.date}</p>
                   </div>
                   <div className="text-right">
                     <span className={`block text-xs font-bold uppercase ${red.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}`}>{red.status}</span>
                     <span className="text-xs text-gray-500">-{red.cost} pts</span>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- MAIN LAYOUT ---

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => { setActiveTab(id); setViewMode('list'); setIsSidebarOpen(false); }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === id ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'dark bg-slate-900' : 'bg-gray-50'}`}>
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
      {showQR && <QRModal />}
      
      {/* ADDED: Chat Assistant Component */}
      <ChatAssistant />

      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-slate-800 p-4 shadow-sm flex items-center justify-between sticky top-0 z-40">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-600 dark:text-gray-300"><Menu className="w-6 h-6" /></button>
        <span className="font-bold text-lg text-indigo-600">CampusConnect</span>
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-700">{user.avatar}</div>
      </div>

      <div className="flex max-w-7xl mx-auto h-screen overflow-hidden">
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 shadow-xl transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:shadow-none lg:bg-transparent ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full flex flex-col p-6">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-2">
                 <div className="bg-indigo-600 p-1.5 rounded-lg"><BookOpen className="w-6 h-6 text-white" /></div>
                 <h1 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">Campus<span className="text-indigo-600">Connect</span></h1>
               </div>
               <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500"><X /></button>
            </div>
            <nav className="flex-1 space-y-2">
              <NavItem id="home" icon={Users} label="Dashboard" />
              {user.role === 'Student' && <NavItem id="gamification" icon={Trophy} label="Campus Rewards" />}
              {user.role === 'Student' && <NavItem id="my-requests" icon={FileText} label="My Requests" />}
              {(user.role === 'Faculty' || user.role === 'Admin') && <NavItem id="approvals" icon={CheckSquare} label="Approvals" />}
              <NavItem id="calendar" icon={Calendar} label="Schedule & Exams" />
              <NavItem id="resources" icon={BookOpen} label="Resource Booking" />
              <NavItem id="connect" icon={MessageSquare} label="Connect Hub" />
            </nav>
            <div className="pt-6 border-t border-gray-100 dark:border-slate-700 space-y-4">
              <div className="flex items-center justify-between bg-gray-50 dark:bg-slate-900 p-3 rounded-xl">
                 <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Dark Mode</span>
                 <button onClick={() => setDarkMode(!darkMode)} className={`w-12 h-6 rounded-full p-1 flex transition-colors ${darkMode ? 'bg-indigo-600 justify-end' : 'bg-gray-300 justify-start'}`}><div className="w-4 h-4 bg-white rounded-full shadow-sm" /></button>
              </div>
              <button onClick={() => setUser(null)} className="flex items-center space-x-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors w-full"><LogOut className="w-5 h-5" /><span>Log Out</span></button>
            </div>
          </div>
        </aside>

        {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
          <header className="hidden lg:flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {activeTab === 'home' && 'Dashboard'}
              {activeTab === 'gamification' && 'Campus Rewards & Points'}
              {activeTab === 'approvals' && 'Admin & Faculty Approvals'}
              {activeTab === 'connect' && 'Connect Hub'}
            </h1>
            <div className="flex items-center gap-4">
               <div className="relative">
                 <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                 <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white w-64" />
               </div>
               <button className="relative p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
               </button>
               <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-slate-700">
                 <div className="text-right hidden xl:block">
                   <p className="text-sm font-bold text-gray-800 dark:text-white">{user.name}</p>
                   <p className="text-xs text-gray-500">{user.department}</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white dark:ring-slate-800">{user.avatar}</div>
               </div>
            </div>
          </header>

          <div className="max-w-6xl">
            {activeTab === 'home' && (
              <div className="space-y-6 animate-fade-in">
                {/* Announcement Banner */}
                <AnnouncementBanner messages={announcements} />

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-1">Welcome back, {user.name.split(' ')[0]}!</h2>
                    <p className="opacity-90">Here is what's happening on campus today.</p>
                    {user.role === 'Student' && (
                       <button onClick={() => setActiveTab('gamification')} className="mt-4 inline-flex items-center bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full backdrop-blur-sm cursor-pointer">
                         <Award className="w-4 h-4 mr-2 text-yellow-300" />
                         <span className="font-semibold">{user.points} Campus Points</span>
                         <span className="ml-2 text-xs opacity-75">→ Redeem</span>
                       </button>
                    )}
                  </div>
                  <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-8"></div>
                </div>

                {/* FACULTY ONLY: Announcement Input */}
                {user.role === 'Faculty' && (
                  <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-indigo-100 dark:border-indigo-900 mb-6">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <Megaphone className="w-5 h-5 text-indigo-500" /> Post Official Announcement
                    </h3>
                    <form onSubmit={handleAnnouncementSubmit} className="flex gap-2">
                      <input name="announcementText" className="flex-1 p-3 rounded-lg border border-gray-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-indigo-500" placeholder="Type urgent announcement here..." required />
                      <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium whitespace-nowrap">Broadcast</button>
                    </form>
                  </div>
                )}

                {/* Standard Home Feed... (Simplified) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-slate-700">
                         <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center"><MessageSquare className="w-5 h-5 mr-2 text-indigo-500" />Campus Feed</h3>
                         
                         {/* Integrated Post Input for All Roles */}
                         <form onSubmit={handlePostSubmit} className="mb-6">
                           <div className="flex gap-3">
                             <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">{user.avatar}</div>
                             <input name="postContent" type="text" placeholder={`Share something, ${user.name}...`} className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:text-white" />
                           </div>
                         </form>

                         <div className="space-y-4">
                           {posts.map(post => (
                              <div key={post.id} className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl">
                                <p className="font-bold text-gray-800 dark:text-white text-sm mb-1">{post.author} <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-normal ml-2">{post.role}</span> <span className="font-normal text-gray-500 ml-1">• {post.time}</span></p>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{post.content}</p>
                              </div>
                           ))}
                         </div>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-slate-700">
                         <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center"><Calendar className="w-5 h-5 mr-2 text-indigo-500" /> Upcoming</h3>
                         {events.slice(0, 3).map(evt => (
                            <div key={evt.id} className="flex gap-3 items-start p-3 bg-gray-50 dark:bg-slate-900/50 rounded-lg border-l-4 border-indigo-500 mb-2">
                               <div><p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{evt.title}</p><p className="text-xs text-gray-500">{evt.time}</p></div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            )}
            
            {activeTab === 'gamification' && <GamificationView />}
            
            {activeTab === 'resources' && <ResourcesView />}
            
            {activeTab === 'calendar' && (
              <div className="animate-fade-in bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-slate-700">
                 <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Academic Calendar</h2>
                 <p className="text-gray-500">Weekly schedule view coming soon. Check the dashboard for upcoming events.</p>
              </div>
            )}
            {activeTab === 'my-requests' && (
               <div className="space-y-6 animate-fade-in">
                  <div className="flex justify-between items-center">
                     <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user.role === 'Faculty' ? 'Create Event' : 'My Event Requests'}</h2>
                     {viewMode === 'list' && <button onClick={() => setViewMode('create')} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"><PlusCircle className="w-4 h-4" /> New Request</button>}
                  </div>
                  {viewMode === 'create' ? <EventForm onSubmit={user.role === 'Faculty' ? handleDirectCreate : handleRequestSubmit} mode={user.role === 'Faculty' ? 'direct' : 'request'} onCancel={() => {setViewMode('list'); setPrefilledLocation('');}} initialLocation={prefilledLocation} /> : (
                     <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden p-4">
                        {requests.filter(r => r.requesterId === user.id).length === 0 ? <p className="text-gray-500 text-center">No requests.</p> : requests.filter(r => r.requesterId === user.id).map(req => (
                           <div key={req.requestId} className="p-4 border-b last:border-0 border-gray-100 dark:border-slate-700">
                              <h4 className="font-bold text-gray-800 dark:text-white">{req.title}</h4>
                              <p className="text-sm text-gray-500">{req.status}</p>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            )}
            {activeTab === 'approvals' && <FacultyApprovalView />}
            {activeTab === 'connect' && <ConnectHubView />}
          </div>
        </main>
      </div>
    </div>
  );
}