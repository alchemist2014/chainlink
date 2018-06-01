const SpecAndRunLog = artifacts.require('./SpecAndRunLog.sol');
const LinkToken = artifacts.require('../node_modules/smartcontractkit/chainlink/solidity/contracts/LinkToken.sol');
const Oracle = artifacts.require('../node_modules/smartcontractkit/chainlink/solidity/contracts/Oracle.sol');

module.exports = function (deployer) {
  deployer.deploy(
    SpecAndRunLog,
    process.env.LINK_TOKEN_ADDRESS,
    process.env.ORACLE_CONTRACT_ADDRESS
  ).then(async function () {
    let linkInstance = await LinkToken.at(process.env.LINK_TOKEN_ADDRESS)
    await linkInstance.transfer(SpecAndRunLog.address, web3.toWei(1000))
  })
}
