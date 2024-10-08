import React, { useState } from 'react';
import axios from 'axios';

const AddCategory= () => {
    const [nazwa, setNazwa] = useState('');
    const [dziedzinaNaukowa, setDziedzinaNaukowa] = useState('');
    const [przedzialWiekowy, setPrzedzialWiekowy] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCategory = {
            nazwa,
            dziedzinaNaukowa,
            przedzialWiekowy
        };

        try {
            const response = await axios.post('http://localhost:8080/api/categories', newCategory);
            console.log('Kategoria została dodana', response.data);
            // Ewentualnie zresetuj formularz
            setNazwa('');
            setDziedzinaNaukowa('');
            setPrzedzialWiekowy('');
        } catch (error) {
            console.error('Błąd podczas dodawania kategorii:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nazwa kategorii:</label>
                <input
                    type="text"
                    value={nazwa}
                    onChange={(e) => setNazwa(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Dziedzina naukowa:</label>
                <select
                    value={dziedzinaNaukowa}
                    onChange={(e) => setDziedzinaNaukowa(e.target.value)}
                    required
                >
                    <option value="">Wybierz dziedzinę</option>
                    <option value="Matematyka">Matematyka</option>
                    <option value="Przyroda">Przyroda</option>
                    <option value="Zadania logiczne">Zadania logiczne</option>
                    <option value="Historia">Historia</option>
                </select>
            </div>
            <div>
                <label>Przedział wiekowy:</label>
                <select
                    value={przedzialWiekowy}
                    onChange={(e) => setPrzedzialWiekowy(e.target.value)}
                    required
                >
                    <option value="">Wybierz przedział wiekowy</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
            </div>
            <button type="submit" onClick={handleSubmit}>Dodaj kategorię</button>
        </form>
    );
};

export default AddCategory