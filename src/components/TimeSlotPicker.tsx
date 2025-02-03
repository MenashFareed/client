import React, { useState } from 'react';
import { Button, Grid, Paper, Typography, List, ListItem, ListItemButton, ListItemText, Grid2 } from '@mui/material';
import { TimeSlot } from '../types/TimeSlot';

const TimeSlotPicker = ({ slots, handleSlotPick }: { slots: TimeSlot[], handleSlotPick: (slot: TimeSlot) => void }) => {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

    const groupSlotsByDay = (slots: TimeSlot[]) => {
        return slots.reduce((acc, slot) => {
        const date = new Date(slot.startTime).toLocaleDateString(); // Get the date string (e.g., "10/5/2023")
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(slot);
        return acc;
        }, {} as { [key: string]: TimeSlot[] });
    }

    const slotsByDay = groupSlotsByDay(slots);

    const handleTimeSlotSelect = (slot: TimeSlot) => {
        setSelectedTimeSlot(slot);
        handleSlotPick(slot);
    }

    return (
        <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant='h6' gutterBottom>
                Select a Time Slot
            </Typography>
            {Object.entries(slotsByDay).map(([date, slots]) => (
                <div key={date}>
                    <Typography variant="subtitle1" sx={{ marginTop: 2, marginBottom: 1 }}>
                        {date}
                    </Typography>
                    <Grid2 container spacing={2}>
                        {slots.map((slot: TimeSlot) => {
                            const  isSelected = selectedTimeSlot?._id === slot._id;

                            return (
                                <Grid2 key={slot._id}>
                                    <Button
                                        variant="contained"
                                        disabled={!slot.isAvailable}
                                        onClick={() => handleTimeSlotSelect(slot)}
                                        sx={{
                                            backgroundColor: isSelected
                                                ? 'primary.main' // Color for selected slot
                                                : !slot.isAvailable
                                                ? 'grey.300' // Gray out unavailable slots
                                                : 'background.paper', // Default color
                                            color: isSelected ? 'common.white' : 'text.primary',
                                            '&:hover': {
                                                backgroundColor: isSelected
                                                    ? 'primary.dark'
                                                    : 'grey.200',
                                            },
                                        }}
                                    >
                                        {new Date(slot.startTime).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}{' '}
                                        -{' '}
                                        {new Date(slot.endTime).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </Button>
                                </Grid2>
                            );
                        })}
                    </Grid2>
                </div>
            ))}
        </Paper>
    )
}

export default TimeSlotPicker;