import React, { useState } from "react";
import authAxios from '../utils/authAxios';

const initialColor = {
    color: "",
    code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
    const [editing, setEditing] = useState(false);
    const [colorToEdit, setColorToEdit] = useState(initialColor);
    const [colorToAdd, setColorToAdd] = useState(initialColor);

    const handleSubmitNewColor = (event) => {
        event.preventDefault();
        
        authAxios().post('/api/colors', colorToAdd)
            .then(response => {
                updateColors(
                    [
                        ...colors,
                        colorToAdd
                    ]
                );
            })
            .catch(error => {
                console.log(error);
            });
    }

    const editColor = color => {
        setEditing(true);
        setColorToEdit(color);
    };

    const saveEdit = e => {
        e.preventDefault();

        authAxios().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
            .then(response => {
                const resultColors = colors.map(item => {
                    if (item.id === colorToEdit.id) {
                        return colorToEdit;
                    }
                    return item;
                });

                updateColors(resultColors);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const deleteColor = color => {
        authAxios().delete(`/api/colors/${color.id}`)
            .then(response => {
                const resultColors = colors.filter(item => {
                    return item.id !== color.id;
                });

                updateColors(resultColors);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="colors-wrap">
            <p>colors</p>
            <ul>
                {colors.map(color => (
                    <li key={color.color} onClick={() => editColor(color)}>
                        <span>
                            <span className="delete" onClick={e => {
                                        e.stopPropagation();
                                        deleteColor(color)
                                    }
                                }>
                                    x
                            </span>{" "}
                            {color.color}
                        </span>
                        <div
                            className="color-box"
                            style={{ backgroundColor: color.code.hex }}
                        />
                    </li>
                ))}
            </ul>
            {editing && (
                <form onSubmit={saveEdit}>
                    <legend>edit color</legend>
                    <label>
                        color name:
                        <input
                            onChange={e =>
                                setColorToEdit({ ...colorToEdit, color: e.target.value })
                            }
                            value={colorToEdit.color}
                        />
                    </label>
                    <label>
                        hex code:
                        <input
                            onChange={e =>
                                setColorToEdit({
                                    ...colorToEdit,
                                    code: { hex: e.target.value }
                                })
                            }
                            value={colorToEdit.code.hex}
                        />
                    </label>
                    <div className="button-row">
                        <button type="submit">save</button>
                        <button onClick={() => setEditing(false)}>cancel</button>
                    </div>
                </form>
            )}

            <h5>Add color:</h5>

            <form onSubmit={handleSubmitNewColor}>
                <p>
                    Color name:
                    <input
                        type="text"
                        onChange={
                            e => setColorToAdd({ ...colorToAdd, color: e.target.value })
                        }
                        value={colorToAdd.color}
                    />
                </p>
                <p>
                    Color hex:
                    <input
                        onChange={e =>
                            setColorToAdd({
                                ...colorToAdd,
                                code: { hex: e.target.value }
                            })
                        }
                        value={colorToAdd.code.hex}
                    />
                </p>
                <p>
                    <button type="submit">ADD</button>
                </p>
            </form>

            <div className="spacer" />
            {/* stretch - build another form here to add a color */}
        </div>
    );
};

export default ColorList;
