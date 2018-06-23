Vue.component('calc-form', {
    data() {
        return {
            // Create the notes array, and add 3 empty fields.
            notes: [
                {
                    index: 0,
                    value: null,
                    weight: null,
                },
                {
                    index: 1,
                    value: null,
                    weight: null,
                },
                {
                    index: 2,
                    value: null,
                    weight: null,
                }
            ],
            goal: 5.5,
            weight: 1,
        }
    },
    methods: {
        /**
         * This function adds an input field to the array, allowing for another mark to be added.
         */
        addField: function () {
            // We push a new object to the array, the v-for attribute will automatically render the input field.
            this.notes.push({
                index: this.notes.length,
                value: null,
                weight: null,
            });

            // We then scroll to the bottom of the page.
            window.scrollTo(0,document.body.scrollHeight);
        },
        /**
         * This function removes an input field from the array.
         * @param note
         */
        deleteField: function (note) {
            // If there is only one field in the array we won't delete, but instead clear the fields.
            // This should never actually happen as the button gets disabled, but it's nice to have some protection.
            if (this.notes.length === 1) {
                this.notes[0].value = null;
                this.notes[0].weight = null;
                return;
            }

            // We remove the note from the array, the v-for attribute will automatically remove the inputs from the page.
            this.notes.splice(note, 1);

            // We have to correct the indices.
            for (var i = 0; i < this.notes.length; i++) {
                this.notes[i].index = i;
            }
        }
    },
    computed: {
        /**
         * This is where we calculate the mark needed to reach the wished mark
         * @returns {number}
         */
        computedGoal: function () {
            var totalWeighted = 0;
            var totalWeight = 0;

            // Loop through all notes and calculate the totalWeighted value and the totalWeight
            for (var i = 0; i < this.notes.length; i++) {
                if (note.value === null || note.weight === null)
                    continue;

                totalWeighted += this.notes[i].value * this.notes[i].weight;
                totalWeight += this.notes[i].weight * 1;
            }

            // And here we perform the actual calculation, formula derived from:
            // weighted total / totalWeight = average
            totalWeight += this.weight * 1;
            return ((this.goal * totalWeight) - totalWeighted) / this.weight;
        },
        /**
         * A rounding helper for the goal.
         * @returns {number}
         */
        roundedGoal: function () {
            // Ceil the number on two decimals
            return Math.ceil(this.computedGoal * 100) / 100;
        },
        /**
         * This is where we calculate the average of the user right now
         * @returns {number}
         */
        average: function () {
            var total = 0;
            var weight = 0;

            // Loop through all notes and calculate the weighted total and the total weight.
            for (var i = 0; i < this.notes.length; i++) {
                var note = this.notes[i];

                if (note.value === null || note.weight === null)
                    continue;

                total += note.value * note.weight;
                weight += note.weight * 1;
            }

            // Calculate the average and return it.
            return total / weight;
        },
        /**
         * A rounding helper for the average.
         * @returns {number}
         */
        roundedAverage: function () {
            // Ceil the number on two decimals
            return Math.ceil(this.average * 100) / 100;
        }
    }
});

const app = new Vue({
    el: '#app'
});