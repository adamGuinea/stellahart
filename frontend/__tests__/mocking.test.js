function Person(name, foods) {
    this.name = name;
    this.foods = foods;
}

Person.prototype.fetchFavFoods = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(this.foods), 2000);
    })
}

xdescribe('mocking learning', () => {
    it('mocks a reg fn', () => {
        const fetchDogs = jest.fn();
        fetchDogs('barney');
        fetchDogs('barney');
        expect(fetchDogs).toHaveBeenCalled();
        expect(fetchDogs).toHaveBeenCalledWith('barney');
        expect(fetchDogs).toHaveBeenCalledTimes(2);
    })
    it('can create a person', () => {
        const me = new Person('Adam', ['indian', 'burgers'])
        expect(me.name).toBe('Adam')
    });
    it('can fetch foods', async () => {
        const me = new Person('Adam', ['indian', 'burgers'])
        // mock the fav Foods fn
        me.fetchFavFoods = jest.fn().mockResolvedValue(
            ['sushi', 'ramen']
        )
        const favFoods = await me.fetchFavFoods();
        console.log(favFoods);
        expect(favFoods).toContain('sushi');
    })
})
