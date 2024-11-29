const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

require('chai')
.use(require('chai-as-promised'))
.should();

contract('DecentralBank', ([owner, customer]) => {

    let tether, rwd, decentralBank

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        // Charge the contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address);

        // Transfer our tokens to our banks. 
        await rwd.transfer(decentralBank.address, tokens('1000000'))    
        // Transfer 100 tokens to our clients.
        await tether.transfer(customer, tokens('100'), {from: owner})
    });
        

    describe('Tether Token', async () => {
        it('matches name successfully', async() => {
            const name = await tether.name();
            assert.equal(name, 'Tether Token');
        });
    });

    describe('Reward Token', async () => {
        it('matches name successfully', async() => {
            const name = await rwd.name();
            assert.equal(name, 'Reward Token');
        });
    });

    describe('Decentral Bank', async () => {
        it('matches name successfully', async() => {
            const name = await decentralBank.name();
            assert.equal(name, 'Decentral Bank');
        })
        it('contract has tokens', async() => {
           let balance = await rwd.balanceOf(decentralBank.address)
           assert.equal(balance, tokens('1000000'))
        });

    describe('Yield farming', async () => {
        it('rewards tokens for staking', async () => {
            let result

            // Check clientt token balance.
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100', 'customer tether balance before staking'))
            

            // Check staking for customer
            await tether.approve(decentralBank.address, tokens('100'), {from: customer});
            await decentralBank.depositTokens(tokens('100'), {from: customer});
    
        
            // Check that the balance updated after staking
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('0', 'Customer balance after staking'));
           
            // Check Bank balance update
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('100', 'Decentral Bank balance after staking from customer'));
            // Check Bank balance update
            
        
            // Is staking balance
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'true', 'Customer is staking')
        
            // Issue tokens
            await decentralBank.issueTokens({from: owner})

            // Only owner can issue token
            await decentralBank.issueTokens({from: customer}).should.be.rejected;

            // Check the amount was substract from our bank.
            await decentralBank.unstakeTokens({from: customer});

            //Check unstaking balances

            // Check client token balance.
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), tokens('100', 'customer tether balance after unstaking'));

            // Check Bank balance update
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('0', 'Decentral Bank balance after unstaking from customer'));

            //  Staking stake update
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'false', 'Customer has unstaked');

        });
        
        });
                
     });
    
});