// controllers/serviceController.js

import Service from '../models/Service.js';
import ServiceUsage from '../models/ServiceUsage.js';

export const getAvailableServices = async (req, res) => {
  const role = req.user.role;
  const services = await Service.find({ availableFor: role });
  res.json(services);
};

export const useService = async (req, res) => {
  const { serviceId } = req.params;
  const user = req.user;

  const service = await Service.findById(serviceId);
  if (!service) return res.status(404).json({ message: 'Service not found' });

  if (!service.availableFor.includes(user.role)) {
    return res.status(403).json({ message: 'You are not allowed to use this service' });
  }

  // Save to usage logs
  const usage = await ServiceUsage.create({
    user: user._id,
    service: serviceId,
    meta: {
      ip: req.ip,
      os: req.headers['user-agent'],
    },
  });

  res.json({ message: `${service.name} access granted`, usage });
};
