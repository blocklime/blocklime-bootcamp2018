var CrowdFunder = artifacts.require("./CrowdFunder.sol");

module.exports = function(deployer) {
	deployer.deploy(CrowdFunder,
				  				24,
				  				"testing",
				  				"0xb348434C8EC2e44Ac328B511384898fcBC657757",
				  				10
	);
};
