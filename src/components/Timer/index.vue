<template>
    <div>
        <h4 class="text-h4 time font-weight-bold mb-16 mt-16">
            {{ timeLeftFormatted }}
        </h4>
        <v-progress-linear v-if="startsAt" :value="timeLeftOutOfTotal" height="30" rounded>
            <span class="text-h6">{{ Number(timeLeftOutOfTotal).toFixed(2) }}%</span>
        </v-progress-linear>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import { plural } from '~/utils/string';

export default {
    name: 'Timer',
    props: {
        endsAt: {
            type: Number,
            required: true,
        },
        startsAt: {
            type: Number,
        },
    },
    data: () => ({
        timerInstance: null,
        currentTime: Date.now(),
    }),
    computed: {
        totalTime() {
            return this.startsAt ? this.endsAt - this.startsAt : 0;
        },
        timeLeft() {
            const diff = this.endsAt - this.currentTime;
            return diff > 0 ? diff : 0;
        },
        timeLeftOutOfTotal() {
            return (1 - this.timeLeft / this.totalTime) * 100;
        },
        timeLeftFormatted() {
            const duration = dayjs.duration(this.timeLeft);
            const durationFormatted = [];

            const months = Math.floor(duration.asMonths());
            if (months) {
                durationFormatted.push(
                    `${months} ${plural(['месяц', 'месяца', 'месяцев'], months)}`,
                );
            }

            const days = duration.days();
            if (days || durationFormatted.length) {
                durationFormatted.push(`${days} ${plural(['день', 'дня', 'дней'], days)}`);
            }

            const hours = duration.hours();
            if (hours || durationFormatted.length) {
                durationFormatted.push(`${hours} ${plural(['час', 'часа', 'часов'], hours)}`);
            }

            const minutes = duration.minutes();
            if (minutes || durationFormatted.length) {
                durationFormatted.push(
                    `${minutes} ${plural(['минута', 'минуты', 'минут'], minutes)}`,
                );
            }

            const seconds = duration.seconds();
            durationFormatted.push(
                `${seconds} ${plural(['секунда', 'секунды', 'секунд'], seconds)}`,
            );

            return durationFormatted.join(' ');
        },
    },
    created() {
        this.timerInstance = setInterval(() => {
            this.currentTime = Date.now();
        }, 500);
    },
    beforeDestroy() {
        clearInterval(this.timerInstance);
    },
};
</script>
<style>
.time {
    color: #000;
}
</style>
