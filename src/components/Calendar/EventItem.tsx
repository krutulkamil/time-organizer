import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {deleteUserEvent, updateUserEvent, UserEvent} from "../../redux/user-events";
import {useDispatch} from "react-redux";

interface Props {
    event: UserEvent;
}

const EventItem: React.FC<Props> = ({event}) => {
    const [editable, setEditable] = useState<boolean>(false);
    const [title, setTitle] = useState(event.title);

    let dateStart = new Date();
    dateStart.setTime(Date.parse(event.dateStart));
    const startHours = dateStart.getUTCHours() + 1;
    const startMinutes = dateStart.getUTCMinutes();

    let dateEnd = new Date();
    dateEnd.setTime(Date.parse(event.dateEnd));
    const endHours = dateEnd.getUTCHours() + 1;
    const endMinutes = dateEnd.getUTCMinutes();

    const dispatch = useDispatch();
    const handleDeleteClick = () => {
        dispatch(deleteUserEvent(event.id));
    }

    const handleTitleClick = () => {
        setEditable(true);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editable) {
            inputRef.current?.focus();
        }
    }, [editable]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleBlur = () => {
        if (title !== event.title) {
            dispatch(updateUserEvent({
                ...event,
                title
            }));
        }
        setEditable(false);
    }

    return (
        <div key={event.id} className="calendar-event">
            <div className="calendar-event-info">
                <div className="calendar-event-time">{startHours}:{startMinutes} - {endHours}:{endMinutes}</div>
                <div className="calendar-event-title">
                    {editable ? (
                        <input
                            type="text"
                            value={title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            ref={inputRef}/>
                    ) : (
                        <span onClick={handleTitleClick}>{event.title}</span>
                    )}
                </div>
            </div>
            <button className="calendar-event-delete-button" onClick={handleDeleteClick}>&times;</button>
        </div>
    )
};

export default EventItem;
