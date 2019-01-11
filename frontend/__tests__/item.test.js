import ItemComponent from '../components/Item';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
    id: '424242',
    title: 'Nike Air',
    price: 300,
    description: 'This is a really cool item',
    image: 'shoe.jpg',
    largeImage: 'bigShoe.jpg',
};

xdescribe('<Item />', () => {
    it('renders and matches the snapshot', () => {
        const wrapper = shallow(<ItemComponent item=
            {fakeItem} />);
        
        expect(toJSON(wrapper)).toMatchSnapshot()
    });
    // it('renders and image properly', () => {
    //     const wrapper = shallow(<ItemComponent item=
    //     {fakeItem} />)
    //     const img = wrapper.find('img');
    //     expect(img.props().src).toBe(fakeItem.image);
    //     expect(img.props().alt).toBe(fakeItem.title);
    // })
    // it('renders pricetag and title properly', () => {
    //     const wrapper = shallow(<ItemComponent item=
    //         {fakeItem} />)
    //         const PriceTag = wrapper.find('PriceTag')
    //         expect(PriceTag.children().text()).toBe('$3');
    //         expect(wrapper.find('Title a').text()).toBe
    //         (fakeItem.title);
    // });
    // it('renders out the buttons properly', () => {
    //     const wrapper = shallow(<ItemComponent item=
    //     {fakeItem} />);
    //     const buttonList = wrapper.find('.buttonList');
    //     expect(buttonList.children()).toHaveLength(3);
    //     expect(buttonList.find('Link')).toBeTruthy();
    //     expect(buttonList.find('AddToCart')).toBeTruthy();
    //     expect(buttonList.find('DeleteItem')).toBeTruthy();
    // });
});