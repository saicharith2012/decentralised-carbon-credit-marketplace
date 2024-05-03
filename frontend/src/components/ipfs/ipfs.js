import { create } from 'kubo-rpc-client';

const ipfs = create({
    url: 'http://localhost:5001' // Ensure this matches your IPFS server's address
});

export default ipfs;
