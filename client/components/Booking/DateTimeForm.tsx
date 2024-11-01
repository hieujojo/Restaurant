import React, { useState } from 'react';

interface FormData {
  date: string;
  startTime: string;
  endTime: string;
}

const DateTimeForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    startTime: '',
    endTime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { date, startTime, endTime } = formData;
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    console.log('Selected Date:', date);
    console.log('Start DateTime:', startDateTime.toISOString());
    console.log('End DateTime:', endDateTime.toISOString());

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="startTime">Start Time:</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="endTime">End Time:</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default DateTimeForm;