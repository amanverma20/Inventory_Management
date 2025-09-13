import { motion } from 'framer-motion';

const DashboardCard = ({ title, value, icon, bgColor = 'bg-white', textColor = 'text-indigo-600', onClick }) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
      className={`${bgColor} p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-sm font-medium ${textColor} opacity-75`}>{title}</div>
          <div className={`text-3xl font-bold ${textColor} mt-2`}>{value}</div>
        </div>
        <div className={`text-4xl ${textColor} opacity-60`}>
          {icon}
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className={`h-2 rounded-full ${textColor.replace('text-', 'bg-')}`}
            initial={{ width: 0 }}
            animate={{ width: '70%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
