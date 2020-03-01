import SunCalc from 'suncalc'

interface SignContent {
    suggestion: string;
    information: string;
    isGoldenHour: boolean;
    timer?: string;
    goldenHourPercent?: number;
}

export function GetSignContent(date: Date, position?: Position): SignContent {
    if (!position) return NoGoldenHourNoPositionResponse()

    const goldenHours = GetGoldenHours(date, position)

    if (date.getTime() >= goldenHours.morningGoldenHourStart.getTime() && 
        date.getTime() < goldenHours.morningGoldenHourEnd.getTime()) {

        return YesGoldenHourResponse(
            date, 
            goldenHours.morningGoldenHourStart,
            goldenHours.morningGoldenHourEnd,
        )
    }

    if (date.getTime() >= goldenHours.eveningGoldenHourStart.getTime() && 
        date.getTime() < goldenHours.eveningGoldenHourEnd.getTime()) {

        return YesGoldenHourResponse(
            date, 
            goldenHours.eveningGoldenHourStart,
            goldenHours.eveningGoldenHourEnd,
        )
    }

    if (date.getTime() < goldenHours.morningGoldenHourStart.getTime()) {
        return NoGoldenHourPreviousDayResponse(
            date, 
            goldenHours.morningGoldenHourStart,
            goldenHours.eveningGoldenHourEnd,
        )
    }

    if (date.getTime() < goldenHours.eveningGoldenHourStart.getTime()) {
        return NoGoldenHourResponse(
            date, 
            goldenHours.eveningGoldenHourStart,
            goldenHours.morningGoldenHourEnd,
        )
    }

    if (date.getTime() >= goldenHours.eveningGoldenHourEnd.getTime()) {
        return NoGoldenHourNextDayResponse(
            date, 
            goldenHours.morningGoldenHourStart,
            goldenHours.eveningGoldenHourEnd,
        )
    }

    return NoGoldenHourSomethingWrongResponse()
}

interface GoldenHourTimes {
    morningGoldenHourStart: Date;
    morningGoldenHourEnd: Date;
    eveningGoldenHourStart: Date;
    eveningGoldenHourEnd: Date;
}

function GetGoldenHours(date: Date, position: Position): GoldenHourTimes {
    const times = SunCalc.getTimes(date, position.coords.latitude, position.coords.longitude)

    return {
        morningGoldenHourStart: times.sunriseEnd,
        morningGoldenHourEnd: times.goldenHourEnd,
        eveningGoldenHourStart: times.goldenHour,
        eveningGoldenHourEnd: times.sunsetStart,
    }
}

function NoGoldenHourNoPositionResponse(): SignContent {
    return {
        suggestion: 'Allow location!',
        information: 'Click on the lock near the website address!',
        isGoldenHour: false
    }
}

function YesGoldenHourResponse(date: Date, goldenHourStart: Date, goldenHourEnd: Date): SignContent {
    return {
        suggestion: 'Right now!',
        information: 'Golden hour ends at ' + GetClockTime(goldenHourEnd),
        timer: GetTimer(date, goldenHourEnd),
        isGoldenHour: true,
        goldenHourPercent: GetDatePercent(date, goldenHourStart, goldenHourEnd)
    }
}

function GetClockTime(date: Date): string {
    const secondsRegex = /:[0-9]+\s/
    return date.toLocaleTimeString('en-US').replace(secondsRegex, ' ')
}

function GetTimer(start: Date, end: Date): string {
    return new Date(end.getTime() - start.getTime() - (1000 * 60 * 60 * 1)).toLocaleTimeString('en-GB')
}

function GetDatePercent(date: Date, goldenHourStart: Date, goldenHourEnd: Date): number {
    return 100 * (date.getTime() - goldenHourStart.getTime()) / (goldenHourEnd.getTime() - goldenHourStart.getTime())
}

function NoGoldenHourPreviousDayResponse(date: Date, goldenHourStart: Date, goldenHourEnd: Date): SignContent {
    const previousEveningGoldenHourEnd = new Date(goldenHourEnd.getTime() - (1000 * 60 * 60 * 24))
    return {
        suggestion: 'Wait for it...',
        information: 'Golden hour starts at ' + GetClockTime(goldenHourStart),
        timer: GetTimer(date, goldenHourStart),
        isGoldenHour: false,
        goldenHourPercent: GetDatePercent(date, previousEveningGoldenHourEnd, goldenHourStart)
    }
}

function NoGoldenHourResponse(date: Date, goldenHourStart: Date, goldenHourEnd: Date): SignContent {
    return {
        suggestion: 'Wait for it...',
        information: 'Golden hour starts at ' + GetClockTime(goldenHourStart),
        timer: GetTimer(date, goldenHourStart),
        isGoldenHour: false,
        goldenHourPercent: GetDatePercent(date, goldenHourEnd, goldenHourStart)
    }
}

function NoGoldenHourNextDayResponse(date: Date, goldenHourStart: Date, goldenHourEnd: Date): SignContent {
    const nextMorningGoldenHourStart = new Date(goldenHourStart.getTime() + (1000 * 60 * 60 * 24))
    return {
        suggestion: 'Wait for it...',
        information: 'Golden hour starts at ' + GetClockTime(nextMorningGoldenHourStart),
        timer: GetTimer(date, nextMorningGoldenHourStart),
        isGoldenHour: false,
        goldenHourPercent: GetDatePercent(date, goldenHourEnd, nextMorningGoldenHourStart)
    }
}

function NoGoldenHourSomethingWrongResponse(): SignContent {
    return {
        suggestion: 'Something went wrong :(',
        information: 'Try to refresh the app!',
        isGoldenHour: false
    }
}