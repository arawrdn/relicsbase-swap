// app.js - RELICSBASE Swap di Base

let provider, signer;

// Router DEX Base (contoh: BaseSwap Router)
const routerAddress = "0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B";
const routerABI = [
  "function swap(address tokenA, address tokenB, uint256 amount) external"
];

// Token RELICSBASE
const relicsAddress = "0x27152ddF6D24b4fcCb93D5242D6184a348BF516a";

// Token lawan (misal USDC Base) → ganti sesuai token yang mau dipakai
const otherTokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

document.getElementById("connect").onclick = async () => {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    alert("Wallet connected to Base!");
  } catch (err) {
    console.error(err);
    alert("Failed to connect wallet");
  }
};

document.getElementById("swap").onclick = async () => {
  const amountInput = document.getElementById("amount").value;
  if (!amountInput || isNaN(amountInput)) {
    alert("Please enter a valid amount");
    return;
  }

  const amount = ethers.utils.parseUnits(amountInput, 18);

  try {
    const router = new ethers.Contract(routerAddress, routerABI, signer);
    const tx = await router.swap(relicsAddress, otherTokenAddress, amount);
    alert("Swap submitted! Transaction hash: " + tx.hash);
    await tx.wait();
    alert("Swap confirmed on Base!");
  } catch (err) {
    console.error(err);
    alert("Swap failed: " + err.message);
  }
};
