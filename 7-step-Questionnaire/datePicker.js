function formatDate(date) {
  if (!date) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const openModalBtn = document.getElementById('openDatePickerBtn');
        const datePicker = document.getElementById('datePicker');
        const monthSelector = document.getElementById('monthSelector');
        const yearSelector = document.getElementById('yearSelector');
        const calendar = document.getElementById('calendar');
        const date1Display = document.getElementById('date1');
        const date2Display = document.getElementById('date2');
        const doneBtn = document.getElementById('doneBtn');

        // Function to generate calendar
        function generateCalendar(month, year) {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            calendar.innerHTML = '';

            // Populate day names
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            days.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.textContent = day;
                dayElement.classList.add('sm:ml-4','ml-2');
                calendar.appendChild(dayElement);
            });

            // Fill in blank spaces
            for (let i = 0; i < firstDayOfMonth; i++) {
                calendar.appendChild(document.createElement('div'));
            }

            // Populate dates
            for (let i = 1; i <= daysInMonth; i++) {
                const dateElement = document.createElement('div');
                dateElement.textContent = i;
                dateElement.classList.add('cursor-pointer', 'p-2', 'text-center');
                dateElement.addEventListener('click', () => selectDate(i));
                calendar.appendChild(dateElement);
            }
        }

        // Function to handle date selection
        let startDate = null;
        let endDate = null;
        function selectDate(date) {
            const selectedDate = new Date(yearSelector.value, monthSelector.value, date);

            if (!startDate) {
                startDate = selectedDate;
                // date1Display.textContent = startDate.toDateString();
                date1Display.textContent = formatDate(startDate);
            } else if (!endDate) {
                endDate = selectedDate;
                // date2Display.textContent = endDate.toDateString();
                date2Display.textContent = formatDate(endDate);

                // Highlight selected range
                const dates = calendar.querySelectorAll('div');
                dates.forEach(dateElement => {
                    const d = parseInt(dateElement.textContent);
                    const currentDate = new Date(yearSelector.value, monthSelector.value, d);
                    if (currentDate >= startDate && currentDate <= endDate) {
                        dateElement.classList.add('bg-[#013911]','text-white','rounded-[7px]');
                    }
                    if (currentDate > startDate && currentDate < endDate) {
                        dateElement.classList.add('bg-[#F3F4F6]','text-black','rounded-none');
                    }
                });
            } else {
                startDate = selectedDate;
                endDate = null;
                // date1Display.textContent = startDate.toDateString();
                date1Display.textContent = formatDate(startDate);
                date2Display.textContent = '';
                calendar.querySelectorAll('div').forEach(dateElement => {
                    dateElement.classList.remove('bg-[#013911]','text-white','rounded-[7px]', 'bg-[#F3F4F6]','text-black','rounded-none');
                });
            }
        }

        // Initialize calendar with current month and year
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        monthSelector.value = currentMonth.toString();
        yearSelector.value = currentYear.toString();
        generateCalendar(currentMonth, currentYear);

        // Event listeners
        openModalBtn.addEventListener('click', () => datePicker.showModal());
        monthSelector.addEventListener('change', () => generateCalendar(parseInt(monthSelector.value), parseInt(yearSelector.value)));
        yearSelector.addEventListener('change', () => generateCalendar(parseInt(monthSelector.value), parseInt(yearSelector.value)));
        doneBtn.addEventListener('click', () => {
          if (startDate && endDate) {
              alert(`Selected dates: ${formatDate(startDate)} to ${formatDate(endDate)}`);
          } else {
              alert("Please select two dates.");
          }
          datePicker.close();
        });
        function resetDates() {
          startDate = null;
          endDate = null;
          date1Display.textContent = '';
          date2Display.textContent = '';
          calendar.querySelectorAll('div').forEach(dateElement => {
              dateElement.classList.remove('bg-[#013911]','text-white','rounded-[7px]', 'bg-[#F3F4F6]','text-black','rounded-none');
          });
        }
      
        // Event listener for modal close event
        datePicker.addEventListener('close', () => resetDates());