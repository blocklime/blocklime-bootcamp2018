var conf = require('./config.json');
var abi = require('../15-example_contract/build/contracts/CrowdFunder.json');
var Web3 = require('web3');
var contract = require('truffle-contract');
var BigNumber = require('bignumber.js');
var Url = require('url');

var http = require('http');

var provider = new Web3.providers.HttpProvider(conf.provider);
var web3 = new Web3(provider);
var MyContract = contract(abi);
MyContract.setProvider(provider);

MyContract.deployed().then(function(crowdFunder){
    var app = http.createServer(function(req,res){
        var url = Url.parse(req.url, true);

        console.log(url.pathname);
        switch (url.pathname) {
            case '/contribute':
                console.log(url.query);

                var ether = parseFloat(url.query.value);

                crowdFunder.contribute({
                    value: web3.toWei(ether,'ether'),
                    from: url.query.address,
					gas: 3000000
                })
                .then(function(){
                    res.end('Thank you');
                })
                .catch(function(err){
                    console.log(err);
                    res.end(err);
                })
                break;
            default:
				crowdFunder.totalRaised()
					.then(total => web3.fromWei(total.toNumber())) // convert returned value to Ether
					.then(total => {
		                res.end(`
		                    <html>
		                    <body>
		                        <h1>Hello</h1>
								
								<div>
									<h2> Total Raised = ${total} </h2>
								</div>
		
		                        <form action="/contribute" method="GET">
		                            Wallet: <input type="text" name="address" id="address">
		                            Contribute: <input type="text" name="value" id="value">
		                            <input type="submit" value="Submit" name="submit">
		                        </form>
		                    </body>
		                    </html>        
		                `);
					})
					.catch(err => console.log(err));
        }
    });
    app.listen(8080,function(){
        console.log("server up");
    });
})
