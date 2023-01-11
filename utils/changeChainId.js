import Web3 from "web3";

const changeChainId = async () => {
    if (!window.ethereum) {
        return {
            success: false,
            message: "Por favor, instala metamask para interactuar con Web3"
        };
    }
    const web3 = new Web3(window.ethereum);
    const chainID = await web3.eth.getChainId();
    if (chainID != process.env.NEXT_PUBLIC_CHAIN_ID) {
        try {
            await web3.eth.currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: process.env.NEXT_PUBLIC_CHAIN_ID_OX }],
            })
            return {
                success: true,
                message: "Cadena de bloques modificada correctamente"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
            
        }
    }
    return {
        success: true,
        message: "Cadena de bloques correcta"
    }
}
export default changeChainId