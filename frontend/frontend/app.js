let provider, signer;

const routerAddress = "0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B"; // ganti dengan Router Base
const routerABI = [
  "function swap(address tokenA, address tokenB, uint256 amount) external"
];

const relicsAddress = "0x27152ddF6D24b4fcCb93D5242D6184a348BF516a";
const otherTokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // ganti token lawan

document.getElementById("connect").onclick = async () => {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  alert("Wallet connected");
};

document.getElementById("swap").onclick = async () => {
  const amount = document.getElementById("amount").value;
  const router = new ethers.Contract(routerAddress, routerABI, signer);
  await router.swap("0x27152ddF6D24b4fcCb93D5242D6184a348BF516a"
, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", ethers.utils.parseUnits(amount, 18));
  alert("Swap executed!");
};
