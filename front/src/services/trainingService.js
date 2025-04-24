// src/services/trainingService.js

export async function getUserTrainings(userId) {
    const res = await fetch(`http://localhost:3000/training/${userId}`);
    if (!res.ok) throw new Error(`Nepodařilo se načíst tréninky pro uživatele ${userId}`);
    return res.json();
  }
  