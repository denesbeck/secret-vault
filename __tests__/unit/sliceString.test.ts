import { sliceString } from '../../utils/stringOperations'

describe("Check if the slice operation is executed correctly. Input string's length is more than entered length.", () => {
    test('Case 1:', () => {
        expect(sliceString('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 16)).toBe('Lorem ipsum dolo...')
    })
    test('Case 2:', () => {
        expect(sliceString('Curabitur consectetur nisl sit amet lorem tempus euismod.', 13)).toBe('Curabitur con...')
    })
    test('Case 3:', () => {
        expect(
            sliceString(
                'Curabitur sollicitudin orci quis egestas interdum. Aliquam eget fringilla dolor. Cras eu elit ultricies, sollicitudin purus sit amet, mollis ligula.',
                62
            )
        ).toBe('Curabitur sollicitudin orci quis egestas interdum. Aliquam ege...')
    })
})

describe("Check if the slice operation is executed correctly. Input string's length equals the entered length.", () => {
    test('Case 1:', () => {
        expect(sliceString('Nam ut velit.', 13)).toBe('Nam ut velit.')
    })

    test('Case 2:', () => {
        expect(sliceString('Aenean scelerisque, libero eu semper.', 37)).toBe('Aenean scelerisque, libero eu semper.')
    })
    test('Case 3:', () => {
        expect(sliceString('Nunc nisl massa, ultrices vel massa sed, condimentum congue felis.', 66)).toBe(
            'Nunc nisl massa, ultrices vel massa sed, condimentum congue felis.'
        )
    })
})

describe("Check if the slice operation is executed correctly. Input string's length is less than the entered length.", () => {
    test('Case 1:', () => {
        expect(sliceString('Etiam sem ligula, convallis nec fringilla sed, sodales ac sapien.', 88)).toBe(
            'Etiam sem ligula, convallis nec fringilla sed, sodales ac sapien.'
        )
    })

    test('Case 2:', () => {
        expect(sliceString('Aliquam eget fringilla dolor.', 30)).toBe('Aliquam eget fringilla dolor.')
    })
    test('Case 3:', () => {
        expect(sliceString('Donec eu sagittis metus. Aenean quis nunc malesuada diam egestas tristique a id erat.', 110)).toBe(
            'Donec eu sagittis metus. Aenean quis nunc malesuada diam egestas tristique a id erat.'
        )
    })
})
