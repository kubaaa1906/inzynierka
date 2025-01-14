import React from "react";
import { useState } from 'react';
import CategoryDetails from "./CategoryDetails";
import styles from './styles.module.css'

const ShowCategories = ({ categories, setCategories }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const handleCloseDetails = () => {
        setSelectedCategory(null);
    };

    const handleDeleteCategory = (categoryId) => {
        setCategories((prevCategories) => prevCategories.filter((category) => category._id !== categoryId));
        setSelectedCategory(null);
    };


    return (
        <div className={styles.usersBox}>
            {selectedCategory ? (
                <CategoryDetails category={selectedCategory} onClose={handleCloseDetails} onDelete={handleDeleteCategory} />
            ) : (
                categories.map((category) => (
                    <button key={category._id} onClick={() => handleSelectCategory(category)}>
                        {category.nazwaKategorii} {category.dziedzinaNaukowa}
                    </button>
                ))
            )}
        </div>
    );
};

export default ShowCategories;