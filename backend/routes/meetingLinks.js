import express from 'express';
import MeetingLink from '../models/MeetingLink.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all meeting links
router.get('/', adminAuth, async (req, res) => {
  try {
    const meetingLinks = await MeetingLink.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: meetingLinks
    });
  } catch (error) {
    console.error('Get meeting links error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get active meeting links (public endpoint)
router.get('/active', async (req, res) => {
  try {
    const meetingLinks = await MeetingLink.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: meetingLinks
    });
  } catch (error) {
    console.error('Get active meeting links error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Create new meeting link
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, link, description } = req.body;

    if (!title || !link) {
      return res.status(400).json({
        success: false,
        error: 'Title and link are required'
      });
    }

    const meetingLink = new MeetingLink({
      title,
      link,
      description
    });

    await meetingLink.save();

    res.status(201).json({
      success: true,
      data: meetingLink
    });
  } catch (error) {
    console.error('Create meeting link error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update meeting link
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const meetingLink = await MeetingLink.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!meetingLink) {
      return res.status(404).json({
        success: false,
        error: 'Meeting link not found'
      });
    }

    res.json({
      success: true,
      data: meetingLink
    });
  } catch (error) {
    console.error('Update meeting link error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Delete meeting link
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const meetingLink = await MeetingLink.findByIdAndDelete(req.params.id);
    
    if (!meetingLink) {
      return res.status(404).json({
        success: false,
        error: 'Meeting link not found'
      });
    }

    res.json({
      success: true,
      message: 'Meeting link deleted successfully'
    });
  } catch (error) {
    console.error('Delete meeting link error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router; 