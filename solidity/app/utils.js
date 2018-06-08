const Eth = require('ethjs')

module.exports = function Utils(provider) {
  this.provider = provider
  this.eth = new Eth(provider)

  this.toWei = function (eth) {
    return (parseInt(eth.toString(), 10) * 10 ** 18).toString()
  }

  this.getTxReceipt = function (txHash) {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < 1000; i++) {
        let receipt = await this.eth.getTransactionReceipt(txHash)
        if (receipt != null) {
          return resolve(receipt)
        }
      }
      reject(`${txHash} unconfirmed!`)
    })
  }

  const txDefaults = { data: '' }
  this.send = async function (params) {
    return this.eth.sendTransaction(Object.assign(txDefaults, params))
  }
}
