// これがコントラクトにアクセスする方法だ：
var abi = ""; /* abi generated by the compiler */
var ZombieFactoryContract = web3.eth.contract(abi)
var contractAddress = /* our contract address on Ethereum after deploying */
var ZombieFactory = ZombieFactoryContract.at(contractAddress)
// `ZombieFactory`はコントラクトのpublic関数とイベントにアクセスできるようになったぞ。

// 入力テキストを取得する類のイベントのリスナーだ：
$("#ourButton").click(function(e) {
  var name = $("#nameInput").val()
  // `createRandomZombie`関数を呼び出す部分だ：
  ZombieFactory.createRandomZombie(name)
})

// `NewZombie`イベントをリッスンしてUIを更新する部分だ
var event = ZombieFactory.NewZombie(function(error, result) {
  if (error) return
  generateZombie(result.zombieId, result.name, result.dna)
})

// ゾンビのdnaを取得して画像を更新する部分だ
function generateZombie(id, name, dna) {
  let dnaStr = String(dna)
  // 16桁未満の場合はDNAの先頭に0をつける部分だ
  while (dnaStr.length < 16)
    dnaStr = "0" + dnaStr

  let zombieDetails = {
    // 最初の2桁は頭の部分だ。頭部は7種類用意してあるから、%7して
    // 0から6の番号を取得したら、そこに1を足して1から7にするのだ。
    // これを基にして、"head1.png" から"head7.png"までの
    // 画像ファイルを用意する部分だ：
    headChoice: dnaStr.substring(0, 2) % 7 + 1,
    // 次の2桁は目の部分だ。11種類用意してあるぞ：
    eyeChoice: dnaStr.substring(2, 4) % 11 + 1,
    // シャツの部分は6種類用意してある：
    shirtChoice: dnaStr.substring(4, 6) % 6 + 1,
    // 最後の6桁は色の部分だ。 CSSのフィルタを使用して更新できる。
    // 360度の色相回転（hue-rotate)を使うぞ：
    skinColorChoice: parseInt(dnaStr.substring(6, 8) / 100 * 360),
    eyeColorChoice: parseInt(dnaStr.substring(8, 10) / 100 * 360),
    clothesColorChoice: parseInt(dnaStr.substring(10, 12) / 100 * 360),
    zombieName: name,
    zombieDescription: "A Level 1 CryptoZombie",
  }
  return zombieDetails
}
