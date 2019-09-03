var web3FusionExtend = require('web3-fusion-extend')
var Web3 = require("web3")
web3 = new Web3("wss://testnetpublicgateway1.fusionnetwork.io:10001");
// web3 = new Web3("https://Kovan.infura.io");
web3 = web3FusionExtend.extend(web3)
const tx = require('ethereumjs-tx').Transaction;
var coinbase = "your account address";
web3.eth.getBalance(coinbase,function(a,b)
	{

console.log(b);
	});
var bytecode = "0x6080604052348015600f57600080fd5b5060596000556093806100236000396000f3fe6080604052600436106038577c010000000000000000000000000000000000000000000000000000000060003504630dbe671f8114603d575b600080fd5b348015604857600080fd5b50604f6061565b60408051918252519081900360200190f35b6000548156fea165627a7a723058201bdc7f42cc41b06e8c46816851241751f1ad079730de0848449981b50381bb5d0029"
// get the number of transactions sent so far so we can create a fresh nonce
web3.eth.getTransactionCount(coinbase).then(txCount => {

  // construct the transaction data
  console.log(txCount);
  const txData = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(250000),
    gasPrice: web3.utils.toHex(10e9), // 10 Gwei
    value: 0,
    data : bytecode
  }

  // fire away!
  sendSigned(txData, function(err, result) {
    if (err) return console.log('error', err)
    console.log('sent', result)
  })

})
function sendSigned(txData, cb) {
  var privateKey = "your private key";
  privateKey = new Buffer(privateKey, 'hex')
  const transaction = new tx(txData)
  transaction.sign(privateKey)
  const serializedTx = transaction.serialize().toString('hex')
  web3.eth.sendSignedTransaction('0x' + serializedTx, cb)
}
