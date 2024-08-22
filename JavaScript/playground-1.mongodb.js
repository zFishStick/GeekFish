use('GamesDB');

db.getCollection('video-games').find({name: "Minecraft"}, {_id: 0, name: 1}).toArray();


