import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DirectorQuiz from './DirectorQuiz';
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    movies: ['Interstellar', 'Zodiac', 'Jaws'], 
    director: {
      name: 'Christopher Nolan',
      imageUrl: 'images/directors/Christopher_nolan.jpg',
      imageSource: 'Wikimedia Commons',
      movies: ['Interstellar',
               'The Dark Knight',
               'Inception'
      ]
    },
    highlight: 'none'
  }
}
 
describe("Director Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<DirectorQuiz {...state} onAnswerSelected={() => {}} />, div);
  });

  describe("When no asnwer has been selected", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<DirectorQuiz {...state} onAnswerSelected={() => {}}/>);
    });

    it("should have no background color", () => {
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("");
    });
  });
});
