// src/routes/followRoutes.js
const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');

router.post('/', followController.createFollow); // Создать подписку
router.get('/:id/following', followController.getFollowing); // Получить всех, на кого подписан пользователь
router.get('/:id/followers', followController.getFollowers); // Получить всех подписчиков пользователя
router.delete('/', followController.deleteFollow); // Удалить подписку

module.exports = router;
