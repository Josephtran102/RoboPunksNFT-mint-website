import React, { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import roboPunksNFT from './JosephRoboPunksNFT.json'; // Import ABI từ file JSON
// eslint-disable-next-line
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const roboPunksNFTAddress = "0x6DE9Cd6AA8C1b2e6F504A96D6980129ca43a6a2F";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi, // Sử dụng ABI từ file JSON
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.002 * mintAmount).toString()),
                });
                console.log('response: ', response);
            } catch (err) {
                console.log("error:", err); 
            }
        }
    }
    
    const handleDecrement = () => {
        if (mintAmount <= 1) return; 
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return; 
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="center" height="100vn" paddingBottom="150px">
            <Box width="820px">
                <div>
                <Text fontSize="48px" textShadow="0 5px #00000">Joseph RoboPunks</Text>
                <Text
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 2px 2px #00000"        
                >
                    In the year 2024, amidst a frenzy of NFT speculation, 
                    a question emerges: Can the RoboPunks NFT hold the key to rescuing humanity 
                    from its destructive grip? Unleash the power of RoboPunks by minting yours today and discover the answer.
                </Text> 
                </div>  

                {isConnected ? (
                
                    <div>
                        <Flex align="center" justify="center">
                            <Button
                                background="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                margin="0 15px"                
                                onClick={handleDecrement}
                            >
                                -
                            </Button>
                            <input 
                                readOnly
                                fontFamily="inherit"
                                width="100px"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px"                                                          
                                type="number" 
                                value={mintAmount} 
                             /> 
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                margin="0 10px"                
                                onClick={handleIncrement}
                            >
                                +
                            </Button>
                        </Flex>
                        <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                margin="0 10px"    
                                onClick={handleMint}
                            >
                                MINT NOW
                            </Button> 
                    </div>
                ) : (
                    <Text
                        marginTop="70px"
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #00000"
                        color="#D6517D"        
                >
                    You must be connected to Mint.
                    </Text>
                )}
            </Box>
        </Flex>
    );
};
 
export default MainMint;
