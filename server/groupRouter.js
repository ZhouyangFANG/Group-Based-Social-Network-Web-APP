const express = require('express');
const fs = require('fs');


app.get('/groups', async (_req, res) => {
  // console.log('READ all groups');
  try {
    const query = 'SELECT * FROM cis557.groups';
    const [rows] = await db.execute(query);
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).json({ error: 'get groups error' });
  }
});

webapp.post('/groups', async (req, res) => {
  // console.log('CREATE a group');
  if (!req.body.name) {
    res.status(400).json({ error: 'invalid input, object invalid' });
    return;
  }
  const newGroup = {
    name = req.body.name,
    admins =req.body.admins, 
    members = req.body.members,
    tags = req.body.tags,
    groupType = req.body.tags,
  }
  try {
    const query = 'INSERT  INTO cis557.players (name, admins, members, tags, groupType) VALUES(?, ?, ?, ?, ?)';
    const params = [req.body.name, req.body.admins, req.body.members, req.body.tags, req.body.groupType];
    const row = await db.execute(query, params);
    res.status(201).json({ id: row[0].insertId, ...newPlayer });// return id of new record
  } catch (err) {
    res.status(409).json({ error: 'group already exists' });
  }
});