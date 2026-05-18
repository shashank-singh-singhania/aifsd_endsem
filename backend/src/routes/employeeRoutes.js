import express from 'express';
import { addEmployee, getEmployees, searchEmployees, updateEmployee, deleteEmployee } from '../controllers/employeeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').post(protect, addEmployee).get(protect, getEmployees);
router.get('/search', protect, searchEmployees);
router.route('/:id').patch(protect, updateEmployee).delete(protect, deleteEmployee);
export default router;
