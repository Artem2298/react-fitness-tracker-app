// src/services/userService.js

export async function getFollowedUsers(userId) {
    const res = await fetch(`http://localhost:3000/follows/${userId}/following`);
    if (!res.ok) throw new Error('Nepodařilo se načíst following');
    const data = await res.json();
    return data.following;
  }
  