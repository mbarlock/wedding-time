"use strict";

var passport = require("passport"),
    Guest = require('../../../models/guest'),
    _ = require("underscore");

module.exports = function (router) {
    router.get("/",
        passport.authenticate("basic"),
        function (req, res) {
            var query = req.query.rsvp ? {rsvpCode: req.query.rsvp} : {};

            Guest.find(query, function (err, guests) {
                var attending = guests
                    .map(function(guest) {
                        guest.rsvpCode = guest.rsvpCode.toLocaleUpperCase();

                        return guest;
                    });

                if (err) {
                    console.log(err);
                    res.send(500, err);
                } else {
                    res.render("invite", {
                        title: "Invitations",
                        layout: "invite",
                        guests: attending
                    });
                }
            });

        }
    );
};
