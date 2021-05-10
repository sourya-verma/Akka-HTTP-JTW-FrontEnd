import { fireEvent, getDefaultNormalizer, render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios'
import AddForm from './AddForm';
import { addNewRecord } from './App'
// import Context from "./Context";


it('table is rendering or not', () => {
  render(<App />);
  const linkElement = screen.getByTestId('table')
  expect(linkElement).toBeTruthy();
});


it('data is comming from backend or not', () => {
  const allData = axios.get(`http://localhost:8080/getlist`)
  expect(allData.data !== null)
});




it("Add new button is rendering or not", () => {

  render(<App />)
  const element = screen.getByTitle('add_new')

  expect(element).toBeTruthy();

})



  it("modal rendered or not", () => {
    render(<App />)
    const modal = screen.getByTitle('mmyModal');
    expect(modal).toBeTruthy();
  })


  it("modal edit button rendered or not", () => {
    render(<App />)
    const modal = screen.getByTitle('edit-btn');
    expect(modal).toBeTruthy();
  })

  it("modal close button rendered or not", () => {
    render(<App />)
    const modal = screen.getByTitle('close-btn');
    expect(modal).toBeTruthy();
  })


  it("Add form rendering or not", ()=>{
    render(<AddForm/>)
    const el = screen.getByTitle('myModal')
    expect(el).toBeTruthy()
  })

  // it("close button in addform rendered or not", () => {
  //   render(<AddForm />)
  //   const modal = screen.getByTitle('close-addform-btn');
  //   expect(modal).toBeInTheDocument();
  // })


    //hideMethod={handleClose} dataVal={addNewRecord}

//   describe("button clicked", ()=>{
//   it(" updates on click",()=>{
//     const fnCall = jest.fn();
//     render(<App fnCall = {}/>)
//     const buttonEl = screen.getByTitle('add_new');
//     fireEvent.click(buttonEl)
//     expect(onClick).toHaveBeenCalled();
//   })
// })




//   it('In SearchButton component button with id btn is present or not', () => {
//     render(<SearchButton />);
//     const linkElement = screen.getByTestId('btn');
//     expect(linkElement).toBeInTheDocument();
//   });

  // describe("input value", ()=>{
  //   it(" updates on change",()=>{
  //     render(<App/>)
  //     const search = screen.getByTestId('search-box');
  //     fireEvent.change(search, {target:{value:"value"}})
  //     expect(search.value).toBe("value");
  //   })
  // })

  // describe("button clicked", ()=>{
  //   it(" updates on click",()=>{
  //     const onClick = jest.fn();
  //     render(<SearchButton onClick = {onClick}/>)
  //     const buttonEl = screen.getByTestId('btn');
  //     fireEvent.click(buttonEl)
  //     expect(onClick).toHaveBeenCalled();
  //   })
  // })