myApp.service('CalendarService', function ($http, $location, filterFilter) {
    console.log('CalendarService Loaded');
    var self = this;

    self.eventObjects = [];

    self.eventInviteObjects = [];

    self.publicEventObjects = [];

    self.eventSearch = "";



    self.acceptInvitation = function (event) {
        $http({
            method: 'PUT',
            url: '/events/invites/accept',
            data: event
        }).then(function (response) {
            console.log('response', response);
            self.getEvents();
            self.criteriaChanged();
            self.getEventInvites()
        })
    }

    self.declineInvitation = function (event) {
        $http({
            method: 'PUT',
            url: '/events/invites/decline',
            data: event
        }).then(function (response) {
            console.log('response', response);
            self.getEvents();
            self.criteriaChanged();
            self.getEventInvites()
        })
    }

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

    self.getPublicEvents = function () {

        // self.publicEventObjects = [];
        $http({
            method: 'GET',
            url: '/events/public'
        }).then(function (response) {
            console.log('PUBLIC EVENT RESPONSE', response);
            for (let i = 0; i < response.data.length; i++) {
                self.publicEventObjects.push({
                    title: response.data[i].title,
                    startsAt: new Date(response.data[i].starts_at),
                    endsAt: new Date(response.data[i].ends_at),
                    color: { primary: response.data[i].color },
                    draggable: true,
                    resizable: true,
                    deleteId: response.data[i].id,
                    editId: response.data[i].eventId
                })

            }
            console.log(self.publicEventObjects);

            // return self.publicEventObjects;
        })
    }
    self.getPublicEvents();

    self.getEvents = function () {

        self.eventObjects = [];
        $http({
            method: 'GET',
            url: '/events'
        }).then(function (response) {

            console.log('response', response);
            for (let i = 0; i < response.data.length; i++) {
                self.eventObjects.push({
                    title: response.data[i].title,
                    startsAt: new Date(response.data[i].starts_at),
                    endsAt: new Date(response.data[i].ends_at),
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

    self.getEventInvites = function () {
        self.eventInviteObjects = [];
        $http({
            method: 'GET',
            url: '/events/invites'
        }).then(function (response) {
            console.log('event invites', response);
            for (let i = 0; i < response.data.length; i++) {
                self.eventInviteObjects.push({
                    title: response.data[i].title,
                    eventId: response.data[i].eventId,
                    accepted: response.data[i].accepted,
                    denied: response.data[i].denied,
                    invited: response.data[i].invited,
                    starts_at: response.data[i].starts_at,
                    ends_at: response.data[i].ends_at,
                    name: response.data[i].name

                })

            }
            console.log(self.eventInviteObjects);

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
            self.criteriaChanged();
            self.getPublicEvents();
            newEvent.title = '';
            newEvent.color = '';
            newEvent.month = '';
            newEvent.day = '';
            newEvent.startDateTime = '';
            newEvent.endDateTime = '';
            console.log('new event Objects', self.eventObjects);
        })
    }

    self.criteriaChanged = function (criteria) {
        console.log(criteria);

        self.filteredEvents = filterFilter(self.eventObjects, criteria)

        console.log('EVENTS', self.filteredEvents);

    }

})