module.exports = {
    users: [
		{
			"id": "f898a61c-43be-49f0-a88f-5b79bc6c2510",
			"name": "RENATO CHRISTIAN",
			"email": "renatochristian1@gmail.com",
			"telephone": "31991377588",
			"profile": "CORRETOR",
			"password": "12345",
			"apiKey": [
				"76206014-df51-4a3d-9ef7-22f0dbef2334"
			],
			"createdAt": 1706866935134
		},
		{
			"id": "812eec22-e95e-4d32-bcfa-ecb0ac9a483f",
			"name": "Gato nou",
			"email": "gato@gato.com",
			"telephone": "31999999999",
			"profile": "CLIENTE",
			"password": "1234",
			"apiKey": [
				"ee8f3765-8c3a-4db3-9d70-8a71490b5087"
			],
			"createdAt": 1706866894368
		},
		{
			"id": "eab759f8-f238-4ff9-ae91-ee1558982329",
			"name": "Lucia Gratao",
			"email": "luciagratao@gmail.com",
			"telephone": "31993286640",
			"profile": "CLIENTE",
			"password": "1234",
			"createdAt": 1599264000000
		}
	],
    schedulings: [
		{
			"id": "117cc9a2-66c4-4061-a4bb-ae3faeae0a02",
			"corretor_id": "f898a61c-43be-49f0-a88f-5b79bc6c2510",
			"cliente_id": "812eec22-e95e-4d32-bcfa-ecb0ac9a483f",
			"horaInicio": "1706968800000",
			"horaFinal": "1706971500000",
			"status": "ATIVO",
			"createdAt": 1706866962853
		},
		{
			"id": "eab759f8-f238-4ff9-ae91-ee1558982329",
			"corretor_id": "f898a61c-43be-49f0-a88f-5b79bc6c2510",
			"cliente_id": "eab759f8-f238-4ff9-ae91-ee1558982329",
			"horaInicio": "1706900400000",
			"horaFinal": "1706904000000",
			"status": "ATIVO",
			"createdAt": 1605225600000
		}
	]
}
