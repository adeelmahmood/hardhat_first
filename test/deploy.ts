import { ethers } from "hardhat"
import { assert, expect } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", function () {
  let factory: SimpleStorage__factory, contract: SimpleStorage;

  beforeEach(async function () {
    factory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory;
    contract = await factory.deploy();
  });

  it("Should find 0 as the default value", async function () {
    const expected = 0;
    const current = await contract.retrieve();
    assert.equal(current.toString(), expected.toString());
  });

  it("Should be able to update the value", async function () {
    const expected = 99;
    const transaction = await contract.store(expected);
    await transaction.wait(1);

    const current = await contract.retrieve();
    assert.equal(current.toString(), expected.toString());
  });

  it("Should add a person with number", async function () {
    const name = "Adeel";
    const number = 17;
    await contract.addPerson(name, number);

    const current = await contract.nameToNumber(name);
    expect(current).to.eq(number);
  })
});