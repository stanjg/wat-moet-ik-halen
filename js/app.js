Vue.component('calc-form', {
    data() {
        return {
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
        addField: function () {
            this.notes.push({
                index: this.notes.length,
                value: null,
                weight: null,
            },);
        },
        deleteField: function (note) {
            if (this.notes.length === 1) {
                this.notes[0].value = null;
                this.notes[0].weight = null;
                return;
            }

            this.notes.splice(note, 1);

            for (var i = 0; i < this.notes.length; i++) {
                this.notes[i].index = i;
            }
        }
    },
    computed: {
        computedGoal: function () {
            var totalWeighted = 0;
            var totalWeight = 0;

            for (var i = 0; i < this.notes.length; i++) {
                totalWeighted += this.notes[i].value * this.notes[i].weight;
                totalWeight += this.notes[i].weight * 1;
            }

            totalWeight += this.weight * 1;

            return ((this.goal * totalWeight) - totalWeighted) / this.weight;
        },
        roundedGoal: function () {
            return Math.ceil(this.computedGoal * 100) / 100;
        },
        average: function () {
            var total = 0;
            var weight = 0;
            for (var i = 0; i < this.notes.length; i++) {
                var note = this.notes[i];

                if (note.value === null || note.weight === null)
                    continue;

                total += note.value * note.weight;
                weight += note.weight * 1;
            }

            return total / weight;
        },
        roundedAverage: function () {
            return Math.ceil(this.average * 100) / 100;
        }
    }
});

const app = new Vue({
    el: '#app'
});