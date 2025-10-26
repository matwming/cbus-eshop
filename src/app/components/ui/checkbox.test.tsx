import React from 'react';
import {  screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './checkbox';
import {selectCategoryAtom} from '@/app/components/states';
import {renderWithJotaiProvider} from "../../../../jest.setup";

const getCheckbox = (name: string) =>
    screen.getByRole('checkbox', { name });

describe('Checkbox', () => {
    it('adds category to selectedCategory after click', () => {
        //Arrange
        const states =[
            [selectCategoryAtom, ['']]
        ];
        //Act
        const { store } = renderWithJotaiProvider(<Checkbox />,states);

        const category = 'electronics';

        //Assert
        expect(getCheckbox(category)).not.toBeChecked();
        expect(store.get(selectCategoryAtom)).not.toContain(category);

        fireEvent.click(getCheckbox(category));

        expect(getCheckbox(category)).toBeChecked();

        expect(store.get(selectCategoryAtom)).toContain(category);
    });

    it('removes category from selectedCategory when unchecked', () => {
        //Arrange
        const states =[
            [selectCategoryAtom, ['electronics']]
        ];
        //Act
        const { store } = renderWithJotaiProvider(<Checkbox />,states);

        //Assert
        expect(getCheckbox('electronics')).toBeChecked();
        expect(store.get(selectCategoryAtom)).toContain('electronics');

        fireEvent.click(getCheckbox('electronics'));

        expect(getCheckbox('electronics')).not.toBeChecked();
        expect(store.get(selectCategoryAtom)).not.toContain('electronics');
    });
});

