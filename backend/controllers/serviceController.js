const Service = require('../models/service');

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const service = await Service.create({
      title,
      description,
      price,
      userId: req.user.userId // owner from JWT
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create service', error: err.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services', error: err.message });
  }
};

// Get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch service', error: err.message });
  }
};

// Update a service (only owner)
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    if (service.userId !== req.user.userId) return res.status(403).json({ message: 'Not authorized' });

    const { title, description, price } = req.body;
    await service.update({ title, description, price });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update service', error: err.message });
  }
};

// Delete a service (only owner)
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    if (service.userId !== req.user.userId) return res.status(403).json({ message: 'Not authorized' });

    await service.destroy();
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service', error: err.message });
  }
};
