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

    if (date.getTime() >= goldenHours.morningGoldenHourStarts.getTime() && 
        date.getTime() < goldenHours.morningGoldenHourEnds.getTime()) {

        return YesGoldenHourResponse(
            date, 
            goldenHours.morningGoldenHourStarts,
            goldenHours.morningGoldenHourEnds,
        )
    }

    if (date.getTime() >= goldenHours.eveningGoldenHourStarts.getTime() && 
        date.getTime() < goldenHours.eveningGoldenHourEnds.getTime()) {

        return YesGoldenHourResponse(
            date, 
            goldenHours.eveningGoldenHourStarts,
            goldenHours.eveningGoldenHourEnds,
        )
    }

    if (date.getTime() < goldenHours.morningGoldenHourStarts.getTime()) {
        return NoGoldenHourResponse(date, goldenHours.morningGoldenHourStarts)
    }

    if (date.getTime() < goldenHours.eveningGoldenHourStarts.getTime()) {
        return NoGoldenHourResponse(date, goldenHours.eveningGoldenHourStarts)
    }

    if (date.getTime() >= goldenHours.eveningGoldenHourEnds.getTime()) {
        return NoGoldenHourNextDayResponse(date, goldenHours.morningGoldenHourStarts)
    }

    return NoGoldenHourSomethingWrongResponse()
}

interface GoldenHourTimes {
    morningGoldenHourStarts: Date;
    morningGoldenHourEnds: Date;
    eveningGoldenHourStarts: Date;
    eveningGoldenHourEnds: Date;
}

function GetGoldenHours(date: Date, position: Position): GoldenHourTimes {
    const times = SunCalc.getTimes(date, position.coords.latitude, position.coords.longitude)

    return {
        morningGoldenHourStarts: times.sunriseEnd,
        morningGoldenHourEnds: times.goldenHourEnd,
        eveningGoldenHourStarts: times.goldenHour,
        eveningGoldenHourEnds: times.sunsetStart,
    }
}

function NoGoldenHourNoPositionResponse(): SignContent {
    return {
        suggestion: 'Enable location!',
        information: 'I need to know it to get to know your golden hour!',
        isGoldenHour: false
    }
}

function YesGoldenHourResponse(date: Date, goldenHourStart: Date, goldenHourEnd: Date): SignContent {
    return {
        suggestion: 'Right now!',
        information: 'Golden hour ends at ' + goldenHourEnd.toLocaleTimeString(),
        timer: new Date(goldenHourEnd.getTime() - date.getTime()).toLocaleTimeString(),
        isGoldenHour: true,
        goldenHourPercent: GetGoldenHourPercent(date, goldenHourStart, goldenHourEnd)
    }
}

function GetGoldenHourPercent(date: Date, goldenHourStart: Date, goldenHourEnd: Date): number {
    return 100 * (date.getTime() - goldenHourStart.getTime()) / (goldenHourEnd.getTime() - goldenHourStart.getTime())
}

function NoGoldenHourResponse(date: Date, goldenHourStart: Date): SignContent {
    return {
        suggestion: 'Wait for it...',
        information: 'Golden hour starts at ' + goldenHourStart.toLocaleTimeString(),
        timer: new Date(goldenHourStart.getTime() - date.getTime()).toLocaleTimeString(),
        isGoldenHour: false
    }
}

function NoGoldenHourNextDayResponse(date: Date, goldenHourStart: Date): SignContent {
    const nextMorningGoldenHourStart = new Date(goldenHourStart.getTime() + (1000 * 60 * 60 * 24))
    return {
        suggestion: 'Wait for it...',
        information: 'Golden hour starts at ' + nextMorningGoldenHourStart.toLocaleTimeString(),
        timer: new Date(nextMorningGoldenHourStart.getTime() - date.getTime()).toLocaleTimeString(),
        isGoldenHour: false
    }
}

function NoGoldenHourSomethingWrongResponse(): SignContent {
    return {
        suggestion: 'Something went wrong :(',
        information: 'Try to refresh the app!',
        isGoldenHour: false
    }
}