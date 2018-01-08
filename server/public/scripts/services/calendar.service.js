myApp.service('CalendarService', function ($http, $location) {
    console.log('CalendarService Loaded');
    var self = this;

    self.eventObjects = [];



    self.addEvent = function () {
        self.eventObjects.push({
            title: 'New event',
            startsAt: moment().startOf('day').toDate(),
            endsAt: moment().endOf('day').toDate(),
            color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                primary: '#e3bc08'
            },
            draggable: true,
            resizable: true
        });

    };



    self.getEvents = function () {

        self.eventObjects = [];
        $http({
            method: 'GET',
            url: '/events'
        }).then(function (response) {

            console.log('response', response);
            for (let i = 0; i < response.data.length; i++) {
                self.eventObjects.push({
                    title: `${response.data[i].title}`,
                    startsAt: new Date(2018, (response.data[i].month - 1), (response.data[i].day), 1),
                    endsAt: new Date(2018, (response.data[i].month - 1), (response.data[i].day), 23),
                    color: { primary: response.data[i].color },
                    draggable: true,
                    resizable: true,
                    deleteId: response.data[i].id,
                    editId: response.data[i].eventId
                })
                
            }
        return self.eventObjects;
        })
    }

    self.addNewEvent = function (newEvent) {
        console.log(newEvent);

        $http({
            method: 'POST',
            url: '/events',
            data: newEvent
        }).then(function (response) {
            console.log('response', response);
            self.getEvents();
            newEvent.title = '';
            newEvent.color = '';
            newEvent.month = '';
            newEvent.day = '';

            console.log('new event Objects', self.eventObjects);
        })
    }


})