const Tx = require('ethereumjs-tx')
const Wallet = require('ethereumjs-wallet')

global.clWallet = global.clWallet || {
  setDefaultKey: function (key) {
    this.privateKey = Buffer.from(key, 'hex')
    const wallet = Wallet.fromPrivateKey(this.privateKey)
    this.address = wallet.getAddress().toString('hex')
  }
}


module.exports = function Wallet(key, eth) {
  this.privateKey = Buffer.from(key, 'hex')
  const wallet = Wallet.fromPrivateKey(this.privateKey)
  this.address = wallet.getAddress().toString('hex')

  this.send async function (params) {
    let eth = clUtils.eth
    let defaults = {
      nonce: await eth.getTransactionCount(this.address),
      chainId: 0
    }
    let tx = new Tx(Object.assign(defaults, params))
    tx.sign(this.privateKey)
    let txHex = tx.serialize().toString('hex')
    return eth.sendRawTransaction(txHex)
  }
}
