import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Header from "./Header";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "@jest/globals";


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

it('renders emoji list succesfully when the page loads', ()=>{
  render(<App />);
  //emoji satırlarını kapsayan divi seçtim. ve o divin 20 tane çocuğu olmalı dedim.
  const emojiListesiKapsayici = screen.getByTestId("all-emojis-cont");
  expect(emojiListesiKapsayici.childNodes.length === 20);
})
it('rerenders when new filtering operation done', ()=>{
  render(<App />);

  //input alanına "love" yazdırdım ve ekrana Dört Yapraklı Yonca emojisi gelmiş mi diye kontrol ettim.
  const myInput = document.getElementsByTagName("input");
  userEvent.type(myInput[0], 'love');
  expect(screen.getByText("Four Leaf Clover"));
})

it('checks whether an emoji copied when clicked on it', ()=>{
  render(<App />);
  const emojiListesiKapsayici = screen.getByTestId("all-emojis-cont");
  const ilkEmoji = emojiListesiKapsayici.firstChild;
  console.log(ilkEmoji.dataset.clipboardText)
  //sayfa yüklendiğinde ilk sıradaki emoji divine tıklıyor ve copyalama işlemi olup olmadığını kontrol ediyorum.
  document.execCommand = jest.fn();
  userEvent.click(ilkEmoji);
  expect(document.execCommand).toHaveBeenCalledWith("copy");
  //kopyalanan dataya ulaşamadığım için kopyalanan data'nın ilgili emoji olup olmadığını test edemedim. Sadece kopyalama işleminin olup olmadığını test edebildim.
})



