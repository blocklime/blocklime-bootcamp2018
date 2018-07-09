module.exports = {
  networks: {
		development: {
			host: "127.0.0.1",
			port: 8545,
			network_id: "*", // Match any network id
			from: "0x70120AB9D061F61252946E7Cf0b8021500b2688A"
		},
		ropsten:  {
			network_id: 3,
			host: "localhost",
			port:  8545,
			gas:   2900000,
			from: "0x09f80ac8714573c55eb1c9d955261e71b8685a5d"
		}
  }
};