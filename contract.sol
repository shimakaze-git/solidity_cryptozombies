pragma solidity ^0.4.19;

contract ZombieFactory {

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    
    // ここにZombieというstructを定義するのだ
    struct Zombie {
        string name;
        uint dna;
    }
}
