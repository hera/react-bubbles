import React, { useState } from "react";
import authAxios from '../utils/authAxios';

const initialColor = {
    color: "",
    code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
    console.log(colors);
    const [editing, setEditing] = useState(false);
    const [colorToEdit, setColorToEdit] = useState(initialColor);

    const editColor = color => {
        setEditing(true);
        setColorToEdit(color);
    };

    const saveEdit = e => {
        e.preventDefault();
        console.log('asdf');

        authAxios().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
            .then(response => {
                console.log(`Edited color with id #${colorToEdit.id}`);
                return authAxios().get('/api/colors');
            })
            .then(response => {
                updateColors(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const deleteColor = color => {
        authAxios().delete(`/api/colors/${color.id}`)
            .then(response => {
                console.log(`Deleted color with id #${color.id}`);
            })
            .catch(error => {
                console.log(error);
            });

        const resultColors = colors.filter(item => {
            return item.id !== color.id;
        });

        updateColors(resultColors);
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
            <div className="spacer" />
            {/* stretch - build another form here to add a color */}
        </div>
    );
};

export default ColorList;
